'use client';

import { nanoid } from 'nanoid';
import {
  FC,
  useState,
  PointerEvent,
  useCallback,
  WheelEvent,
  useMemo,
} from 'react';
import { LiveObject } from '@liveblocks/client';
import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
} from '@/types';
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useStorage,
} from '@/liveblocks.config';
import { CursorsPresence } from './cursors-presence';
import { connectionIdColor, pointerEventToCanvasPoint } from '@/lib/utils';
import { MAX_LAYERS } from '@/constants';
import { LayerPreview } from './layer-preview';

interface Props {
  boardId: string;
}

export const Canvas: FC<Props> = (props) => {
  const layerIds = useStorage((root) => root.layerIds);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.NONE,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const { undo, redo, resume, pause } = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.ELLIPSE
        | LayerType.RECTANGLE
        | LayerType.NOTE
        | LayerType.TEXT,
      position: Point
    ) => {
      const liveLayers = storage.get('layers');

      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get('layerIds');
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.NONE });
    },
    [lastUsedColor]
  );

  const onWheel = useCallback((event: WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - event.deltaX,
      y: camera.y - event.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, event: PointerEvent) => {
      event.preventDefault();

      const current = pointerEventToCanvasPoint(event, camera);

      setMyPresence({ cursor: current });
    },
    []
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerUp = useMutation(
    ({}, event: PointerEvent) => {
      const point = pointerEventToCanvasPoint(event, camera);

      if (canvasState.mode === CanvasMode.INSERTING) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({
          mode: CanvasMode.NONE,
        });
      }

      resume();
    },
    [camera, canvasState, resume, insertLayer]
  );

  const onLayerPointDown = useMutation(
    ({ self, setMyPresence }, event: PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.PENCIL ||
        canvasState.mode === CanvasMode.INSERTING
      ) {
        return;
      }
      pause();
      event.stopPropagation();

      const point = pointerEventToCanvasPoint(event, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }

      setCanvasState({ mode: CanvasMode.TRANSLATION, current: point });
    },
    [setCanvasState, camera, pause, canvasState.mode]
  );

  const selections = useOthersMapped((other) => other.presence.selection);

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info {...props} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={undo}
        redo={redo}
      />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => {
            return (
              <LayerPreview
                key={layerId}
                id={layerId}
                onLayerPointDown={onLayerPointDown}
                selectionColor={layerIdsToColorSelection[layerId]}
              />
            );
          })}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};
