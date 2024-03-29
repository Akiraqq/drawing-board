import { PointerEvent } from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Camera, Color } from '@/types';

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
