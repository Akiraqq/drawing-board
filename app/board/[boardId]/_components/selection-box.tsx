'use client';

import { FC, memo } from 'react';
import { LayerType, Side, XYWH } from '@/types';
import { useSelf, useStorage } from '@/liveblocks.config';
import { useSelectionBounds } from '@/hooks';
import { HANDLE_WIDTH } from '@/constants';

interface Props {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
}

export const SelectionBox: FC<Props> = memo((props) => {
  const { onResizeHandlePointerDown } = props;
  const soleLayerId = useSelf((me) =>
    me.presence.selection.length === 1 ? me.presence.selection[0] : null
  );

  const isShowingHandles = useStorage(
    (root) =>
      soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.PATH
  );

  const bounds = useSelectionBounds();

  if (!bounds) {
    return null;
  }

  return (
    <>
      <rect
        className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
        style={{
          transform: `translate(${bounds.x}px, ${bounds.y}px)`,
        }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />
      {isShowingHandles && (
        <>
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'nwse-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2}px
                )
              `,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.TOP + Side.LEFT, bounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'ns-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
                  ${bounds.y - HANDLE_WIDTH / 2}px
                )
              `,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.TOP, bounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'nesw-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,
                  ${bounds.y - HANDLE_WIDTH / 2}px
                )`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.TOP + Side.RIGHT, bounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'ew-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                  ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px
                )`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.RIGHT, bounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'nwse-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                  ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                )`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.BOTTOM + Side.RIGHT, bounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'ns-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                )`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.BOTTOM, bounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'nesw-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                )`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.BOTTOM + Side.LEFT, bounds);
            }}
          />
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: 'ew-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2}px
                )`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.LEFT, bounds);
            }}
          />
        </>
      )}
    </>
  );
});

SelectionBox.displayName = 'SelectionBox';
