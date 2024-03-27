'use client';

import { FC, useState } from 'react';
import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';
import { CanvasMode, CanvasState } from '@/types';
import { useCanRedo, useCanUndo, useHistory } from '@/liveblocks.config';

interface Props {
  boardId: string;
}

export const Canvas: FC<Props> = (props) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.NONE,
  });

  const { undo, redo } = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info {...props} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={undo}
        redo={redo}
      />
    </main>
  );
};
