'use client';

import { FC, memo } from 'react';
import { MousePointer2 } from 'lucide-react';
import { useOther } from '@/liveblocks.config';
import { DEFAULT_TEAMMATE_NAME } from '@/constants';
import { connectionIdColor } from '@/lib/utils';

interface Props {
  connectionId: number;
}

export const Cursor: FC<Props> = memo((props) => {
  const { connectionId } = props;
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);

  const name = info?.name || DEFAULT_TEAMMATE_NAME;

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: connectionIdColor(connectionId),
          color: connectionIdColor(connectionId),
        }}
      />
      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
        style={{ backgroundColor: connectionIdColor(connectionId) }}
      >
        {name}
      </div>
    </foreignObject>
  );
});