'use client';

import { FC } from 'react';
import { EmptySearch } from './empty-search';
import { EmptyFavorites } from './empty-favorites';
import { EmptyBoards } from './empty-boards';

interface Props {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export const BoardList: FC<Props> = (props) => {
  const { orgId, query } = props;
  const data = []; // TODO: Change to API call

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return <div>{JSON.stringify(query)}</div>;
};
