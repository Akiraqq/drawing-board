'use client';

import { useOrganizationList } from '@clerk/nextjs';
import { useMemo } from 'react';
import { OrgItem } from './org-item';

export const OrgList = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const memoizedList = useMemo(() => {
    return (
      <ul className="space-y-4">
        {userMemberships.data?.map((member) => {
          return (
            <OrgItem
              key={member.organization.id}
              id={member.organization.id}
              name={member.organization.name}
              imageUrl={member.organization.imageUrl}
            />
          );
        })}
      </ul>
    );
  }, [userMemberships.data]);

  if (!userMemberships.data?.length) {
    return null;
  }

  return memoizedList;
};
