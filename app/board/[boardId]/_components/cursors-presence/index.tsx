'use client';

import { FC, memo } from 'react';
import { Cursors } from './cursors';
import { Drafts } from './drafts';

export const CursorsPresence: FC = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />;
    </>
  );
});
