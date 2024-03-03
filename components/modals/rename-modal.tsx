'use client';

import { useRenameModal } from '@/store';
import { FC, FormEventHandler, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from '../ui';
import { MAX_CHAR_LENGTH } from '@/constants';
import { useApiMutation } from '@/hooks';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

export const RenameModal: FC = () => {
  const { mutate, pending } = useApiMutation(api.board.update);
  const { isOpen, onClose, initialValues } = useRenameModal();
  const { title, id } = initialValues;

  const [modalTitle, setModalTitle] = useState(title);

  useEffect(() => {
    setModalTitle(title);
  }, [title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutate({ id, title: modalTitle })
      .then(() => {
        toast.success('Board renamed');
        onClose();
      })
      .catch(() => toast.error('Failed to rename board'));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={MAX_CHAR_LENGTH}
            value={modalTitle}
            onChange={(e) => setModalTitle(e.target.value)}
            placeholder="Board title"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
