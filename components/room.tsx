'use client';

import { FC, ReactNode } from 'react';
import { ClientSideSuspense } from '@liveblocks/react';
import { RoomProvider } from '@/liveblocks.config';

interface Props {
  children: ReactNode;
  boardId: string;
  fallback: NonNullable<ReactNode> | null;
}

export const Room: FC<Props> = (props) => {
  const { children, boardId, fallback } = props;

  return (
    <RoomProvider id={boardId} initialPresence={{}}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
