'use client';

import { FC } from 'react';
import { useOthers, useSelf } from '@/liveblocks.config';
import { UserAvatar } from '../user-avatar';
import { connectionIdColor } from '@/lib/utils';

const MAX_SHOWN_OTHER_USERS = 2;

export const Participants: FC = () => {
  const users = useOthers();
  const currentsUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_OTHER_USERS;
  const usersMoreCount = users.length - MAX_SHOWN_OTHER_USERS;

  return (
    <div
      className="absolute h-12 top-2 right-2 bg-white rounded-md
  p-3 flex items-center shadow-md"
    >
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_OTHER_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              key={connectionId}
              borderColor={connectionIdColor(connectionId)}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || 'T'}
            />
          );
        })}

        {currentsUser && (
          <UserAvatar
            borderColor={connectionIdColor(currentsUser.connectionId)}
            src={currentsUser.info?.picture}
            name={`${currentsUser.info?.name} (You)`}
            fallback={currentsUser.info?.name?.[0]}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${usersMoreCount} more`}
            fallback={`+${usersMoreCount}`}
          />
        )}
      </div>
    </div>
  );
};

export * from './participants-skeleton';
