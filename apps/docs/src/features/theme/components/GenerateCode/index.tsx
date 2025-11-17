import { useMemo } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Flex,
  Typography,
} from '@kimdw-rtk/ui';
import { useOverlay } from '@kimdw-rtk/utils';

import { ThemeVars } from '@/features/theme/types';

interface GenerateCodeProps {
  vars: ThemeVars;
}

export const GenerateCode = ({ vars }: GenerateCodeProps) => {
  const { close } = useOverlay();

  const code = useMemo(() => {
    const result = `globalStyle('.light', {
  vars: {
  ${Object.entries(vars.light)
    .map((key, value) => `theme.color['${key}']: '${value}'`)
    .join(',\n')}
    [theme.color.background]: '255, 0, 0',
  },
});`;

    return result;
  }, [vars]);

  return (
    <Dialog style={{ maxWidth: '800px' }}>
      <DialogHeader onCloseClick={close}>Generate Code</DialogHeader>
      <DialogContent>
        <Typography>
          {code.split('\n').map((line) => (
            <p>{line}</p>
          ))}
        </Typography>
      </DialogContent>
      <DialogFooter>
        <Flex gap="md" padding="xl">
          <Button>Copy to Clipboard</Button>
        </Flex>
      </DialogFooter>
    </Dialog>
  );
};
