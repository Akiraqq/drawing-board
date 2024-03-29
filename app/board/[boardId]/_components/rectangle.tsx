import { FC } from 'react';
import { LayerProps } from './layer-preview';
import { RectangleLayer } from '@/types';
import { colorToCss } from '@/lib/utils';

type Props = LayerProps & {
  layer: RectangleLayer;
};

export const Rectangle: FC<Props> = (props) => {
  const { id, layer, onLayerPointDown, selectionColor } = props;
  const { x, y, width, height, fill } = layer;
  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(event) => onLayerPointDown(event, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      strokeWidth={1}
      stroke={selectionColor || 'transparent'}
      width={width}
      height={height}
      fill={fill ? colorToCss(fill) : '#000'}
    />
  );
};
