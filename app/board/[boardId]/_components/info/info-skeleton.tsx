import { FC } from 'react';
import { Skeleton } from '@/components/ui';

export const InfoSkeleton: FC = () => {
  return (
    <Skeleton
      className="absolute top-2 left-2 bg-white rounded-md px-1.5
h-12 flex items-center shadow-md w-[135px]"
    />
  );
};
