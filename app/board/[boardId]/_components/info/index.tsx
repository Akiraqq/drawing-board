'use client';

import { useQuery } from 'convex/react';
import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Poppins } from 'next/font/google';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { InfoSkeleton } from './info-skeleton';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Hint } from '@/components/hint';
import { TabSeparator } from '../tab-separator';
import { useRenameModal } from '@/store';
import { Actions } from '@/components/actions';

interface Props {
  boardId: string;
}

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export const Info: FC<Props> = (props) => {
  const { boardId } = props;
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, {
    id: boardId as Id<'boards'>,
  });

  if (!data) {
    return <InfoSkeleton />;
  }
  const { title, _id } = data;

  const renameHandler = () => {
    onOpen(_id, title);
  };

  return (
    <div
      className="absolute top-2 left-2 bg-white rounded-md px-1.5
  h-12 flex items-center shadow-md"
    >
      <Hint label="Go to boards" sideOffset={10}>
        <Button asChild variant="board" className="px-2">
          <Link href="/">
            <Image src="/logo.svg" alt="Board logo" height={40} width={40} />
            <span
              className={cn(
                'font-semibold text-xl ml-2 text-black',
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit title" sideOffset={10}>
        <Button
          variant="board"
          className="text-base font-normal px-2"
          onClick={renameHandler}
        >
          {title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={_id} title={title} sideOffset={10}>
        <div>
          <Hint label="Main menu" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export * from './info-skeleton';
