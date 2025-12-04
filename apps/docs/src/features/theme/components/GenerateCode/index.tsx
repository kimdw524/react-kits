import { useMemo } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Flex,
  Typography,
} from '@kimdw-rtk/ui';
import { useOverlay } from '@kimdw-rtk/utils';

import { useClipboard } from '@/shared/hooks';

import { ThemeVars } from '../../models';

interface GenerateCodeProps {
  vars: ThemeVars;
}

export const GenerateCode = ({ vars }: GenerateCodeProps) => {
  const { close } = useOverlay();
  const { copy } = useClipboard();

  const lines = useMemo(() => ThemeVars.generateCode(vars), [vars]);

  const handleClick = () => {
    copy(lines.join('\n'));
  };

  return (
    <Dialog style={{ maxWidth: '800px' }}>
      <DialogHeader onCloseClick={close}>Generate Code</DialogHeader>
      <DialogContent>
        <Box
          backgroundColor="secondary"
          padding="lg"
          rounded
          style={{ maxHeight: '50vh', overflowY: 'scroll' }}
        >
          <Typography fontSize="sm">
            {lines.map((line) => (
              <pre>{line}</pre>
            ))}
          </Typography>
        </Box>
      </DialogContent>
      <DialogFooter>
        <Flex gap="md" padding="xl">
          <Button onClick={handleClick}>Copy to Clipboard</Button>
        </Flex>
      </DialogFooter>
    </Dialog>
  );
};
