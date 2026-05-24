'use client';

import { useImperativeHandle, type ReactNode, type Ref } from 'react';

import { useOverlay, usePreventKeyboardInput } from '@kimdw-rtk/utils';

import { Button, Dialog, DialogContent, DialogFooter, Flex } from '#components';

interface ConfirmProps {
  children: ReactNode;
  ref?: Ref<{ close: () => void }>;
  onConfirm: () => void;
  onCancle: () => void;
}

export const Confirm = ({
  children,
  ref,
  onConfirm,
  onCancle,
}: ConfirmProps) => {
  const { close } = useOverlay();
  usePreventKeyboardInput();

  useImperativeHandle(ref, () => ({
    close,
  }));

  return (
    <Dialog>
      <DialogContent>{children}</DialogContent>
      <DialogFooter>
        <Flex gap="md">
          <Button size="sm" onClick={onConfirm}>
            확인
          </Button>
          <Button color="secondary" size="sm" onClick={onCancle}>
            취소
          </Button>
        </Flex>
      </DialogFooter>
    </Dialog>
  );
};
