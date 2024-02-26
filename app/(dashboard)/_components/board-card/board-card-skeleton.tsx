import { FC } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const BoardCardSkeleton: FC = () => {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
