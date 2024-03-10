import { FC } from 'react';
import { Skeleton } from '@/components/ui';

export const ToolbarSkeleton: FC = () => {
  return (
    <Skeleton
      className="absolute top-[50%] -translate-y-[50%]
left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md"
    />
  );
};
