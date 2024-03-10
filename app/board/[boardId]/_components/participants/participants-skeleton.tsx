import { FC } from 'react';
import { Skeleton } from '@/components/ui';

export const ParticipantsSkeleton: FC = () => {
  return (
    <Skeleton
      className="absolute h-12 top-2 right-2 bg-white rounded-md
p-3 flex items-center shadow-md w-[200px]"
    />
  );
};
