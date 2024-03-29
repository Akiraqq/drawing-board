'use client';

import { FC, ReactNode } from 'react';
import { ClientSideSuspense } from '@liveblocks/react';
import { LiveList, LiveMap, LiveObject } from '@liveblocks/client';
import { RoomProvider } from '@/liveblocks.config';
import { Layer } from '@/types';

interface Props {
  children: ReactNode;
  boardId: string;
  fallback: NonNullable<ReactNode> | null;
}

export const Room: FC<Props> = (props) => {
  const { children, boardId, fallback } = props;

  return (
    <RoomProvider
      id={boardId}
      initialPresence={{ cursor: null, selection: [] }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
