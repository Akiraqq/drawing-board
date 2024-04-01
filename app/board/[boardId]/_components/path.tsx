import { FC, PointerEvent } from 'react';
import getStroke from 'perfect-freehand';
import { colorToCss, getSvgPathFromStroke } from '@/lib/utils';
import { Color } from '@/types';

interface Props {
  x: number;
  y: number;
  points: number[][];
  fill: Color | null;
  onPointerDown?: (e: PointerEvent) => void;
  selectionColor?: string;
}

export const Path: FC<Props> = (props) => {
  const { x, y, fill, points, onPointerDown, selectionColor } = props;

  return (
    <path
      className="drop-shadow-md"
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        })
      )}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      fill={fill ? colorToCss(fill) : '#000'}
      stroke={selectionColor}
      strokeWidth={1}
    />
  );
};
