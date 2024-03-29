'use client';

import { FC, PointerEvent, memo } from 'react';
import { useStorage } from '@/liveblocks.config';
import { LayerType } from '@/types';
import { Rectangle } from './rectangle';

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
    case LayerType.RECTANGLE:
      return <Rectangle id={id} layer={layer} {...restProps} />;
    default:
      console.warn('Unknown layer type');
      return null;
  }
});
