import { useCallback } from 'react';

import { useToast } from '@kimdw-rtk/ui';

export const useClipboard = () => {
  const { push } = useToast();

  const copy = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        push({ message: 'Copied!', color: 'success', duration: 1000 });
      })
      .catch((err) => {
        push({ message: 'Copy failed.', color: 'danger', duration: 1000 });
      });
  }, []);

  return { copy };
};
