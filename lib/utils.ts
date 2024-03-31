import { PointerEvent } from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Camera, Color, Layer, Point, Side, XYWH } from '@/types';

const COLORS = ['#dc2626', '#d97706', '#059669', '#7c3aed', '#d82777'];

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const connectionIdColor = (connectionId: number): string => {
  return COLORS[connectionId % COLORS.length];
};

export const pointerEventToCanvasPoint = (
  event: PointerEvent,
  camera: Camera
) => {
  return {
    x: Math.round(event.clientX) - camera.x,
    y: Math.round(event.clientY) - camera.y,
  };
};

export const colorToCss = (color: Color) => {
  return `#${color.r.toString(16).padStart(2, '0')}${color.g
    .toString(16)
    .padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
};

export const resizeBounds = (
  bounds: XYWH,
  corner: Side,
  point: Point
): XYWH => {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  if ((corner & Side.LEFT) === Side.LEFT) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner & Side.RIGHT) === Side.RIGHT) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if ((corner & Side.TOP) === Side.TOP) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner & Side.BOTTOM) === Side.BOTTOM) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
};

export const findIntersectingLayersWithRectangle = (
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point
) => {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };

  const ids = [];

  for (const layerId of layerIds) {
    const layer = layers.get(layerId);

    if (layer == null) {
      continue;
    }

    const { x, y, height, width } = layer;

    if (
      rect.x + rect.width > x &&
      rect.x < x + width &&
      rect.y + rect.height > y &&
      rect.y < y + height
    ) {
      ids.push(layerId);
    }
  }

  return ids;
};
