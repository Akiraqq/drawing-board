'use client';

import { FC, useState, PointerEvent, useCallback, WheelEvent } from 'react';
import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';
import { Camera, CanvasMode, CanvasState } from '@/types';
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
} from '@/liveblocks.config';
import { CursorsPresence } from './cursors-presence';
import { pointerEventToCanvasPoint } from '@/lib/utils';

interface Props {
  boardId: string;
}

export const Canvas: FC<Props> = (props) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.NONE,
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const { undo, redo } = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

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
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};
