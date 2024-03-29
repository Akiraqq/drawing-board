'use client';

import { FC } from 'react';
import { useOthersConnectionIds } from '@/liveblocks.config';
import { Cursor } from './cursor';

export const Cursors: FC = () => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connectionId) => {
        return <Cursor key={connectionId} connectionId={connectionId} />;
      })}
    </>
  );
};
