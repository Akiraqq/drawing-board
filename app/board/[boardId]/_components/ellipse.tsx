'use client';

import { FC } from 'react';
import { colorToCss } from '@/lib/utils';
import { EllipseLayer } from '@/types';

interface Props {
  id: string;
  layer: EllipseLayer;
  onLayerPointDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Ellipse: FC<Props> = (props) => {
  const { id, layer, onLayerPointDown, selectionColor } = props;

  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(e) => onLayerPointDown(e, id)}
      style={{
        transform: `translate(
          ${layer.x}px,
          ${layer.y}px
        )`,
      }}
      cx={layer.width / 2}
      cy={layer.height / 2}
      rx={layer.width / 2}
      ry={layer.height / 2}
      fill={layer.fill ? colorToCss(layer.fill) : '#000'}
      stroke={selectionColor || 'transparent'}
      strokeWidth="1"
    />
  );
};
