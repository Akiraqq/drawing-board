import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const COLORS = ['#dc2626', '#d97706', '#059669', '#7c3aed', '#d82777'];

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const connectionIdColor = (connectionId: number): string => {
  return COLORS[connectionId % COLORS.length];
};
