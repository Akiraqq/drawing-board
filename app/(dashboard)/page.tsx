'use client';

import { FC } from 'react';
import { useOrganization } from '@clerk/nextjs';
import { BoardList, EmptyOrg } from './_components';

interface Props {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

const DashboardPage: FC<Props> = (props) => {
  const { searchParams } = props;
  const { organization } = useOrganization();

  return (
    <div className=" flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
};

export default DashboardPage;
