import { FC } from 'react';
import { colorToCss } from '@/lib/utils';
import { Color } from '@/types';

interface Props {
  onClick: (color: Color) => void;
  color: Color;
}

export const ColorButton: FC<Props> = (props) => {
  const { onClick, color } = props;

  return (
    <button
      className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-300"
        style={{ background: colorToCss(color) }}
      />
    </button>
  );
};
