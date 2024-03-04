'use client';

import { FC } from 'react';
import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';

interface Props {
  boardId: string;
}

export const Canvas: FC<Props> = (props) => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
};
