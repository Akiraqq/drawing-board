'use client';

import { FC, PointerEvent, memo } from 'react';
import { useStorage } from '@/liveblocks.config';
import { LayerType } from '@/types';
import { Rectangle } from './rectangle';
import { Ellipse } from './ellipse';
import { Text } from './text';
import { Note } from './note';
import { Path } from './path';

export type LayerProps = {
  id: string;
  onLayerPointDown: (event: PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

export const LayerPreview: FC<LayerProps> = memo((props) => {
  const { id, ...restProps } = props;

  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) {
    return null;
  }
  switch (layer.type) {
    case LayerType.PATH:
      return (
        <Path
          x={layer.x}
          y={layer.y}
          fill={layer.fill}
          points={layer.points}
          onPointerDown={(event) => restProps.onLayerPointDown(event, id)}
        />
      );
    case LayerType.NOTE:
      return <Note id={id} layer={layer} {...restProps} />;
    case LayerType.TEXT:
      return <Text id={id} layer={layer} {...restProps} />;
    case LayerType.ELLIPSE:
      return <Ellipse id={id} layer={layer} {...restProps} />;
    case LayerType.RECTANGLE:
      return <Rectangle id={id} layer={layer} {...restProps} />;
    default:
      console.warn('Unknown layer type');
      return null;
  }
});
