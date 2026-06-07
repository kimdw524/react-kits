import { useMemo, useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Flex,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
  useToast,
} from '@kimdw-rtk/ui';
import { useOverlay } from '@kimdw-rtk/utils';

import { ThemeVars } from '../../models';

interface GenerateCodeProps {
  vars: ThemeVars;
}

export const GenerateCode = ({ vars }: GenerateCodeProps) => {
  const { close } = useOverlay();
  const { push } = useToast();
  const [type, setType] = useState<'vanilla-extract' | 'css'>(
    'vanilla-extract',
  );

  const codes = useMemo(
    () => ({
      'vanilla-extract': ThemeVars.generateVanillaExtractCode(vars),
      css: ThemeVars.generateCssCode(vars),
    }),
    [vars],
  );
  const lines = codes[type];

  const handleClick = () => {
    navigator.clipboard
      .writeText(lines.join('\n'))
      .then(() =>
        push({ message: 'Copied!', color: 'success', duration: 1000 }),
      )
      .catch(() =>
        push({ message: 'Copy failed.', color: 'danger', duration: 1000 }),
      );
  };

  return (
    <Dialog style={{ width: '600px' }}>
      <DialogHeader onCloseClick={close}>Generate Code</DialogHeader>
      <DialogContent>
        <Tabs defaultValue="vanilla-extract">
          <TabsList>
            <TabsTrigger
              value="vanilla-extract"
              onClick={() => setType('vanilla-extract')}
            >
              Vanilla Extract
            </TabsTrigger>
            <TabsTrigger value="css" onClick={() => setType('css')}>
              CSS
            </TabsTrigger>
          </TabsList>
          {(['vanilla-extract', 'css'] as const).map((codeType) => (
            <TabsContent key={codeType} value={codeType}>
              <Box
                backgroundColor="secondary"
                padding="lg"
                isRounded
                style={{ maxHeight: '50vh', overflowY: 'scroll' }}
              >
                <Typography fontSize="sm">
                  {codes[codeType].map((line, index) => (
                    <pre key={`${index}-${line}`}>{line}</pre>
                  ))}
                </Typography>
              </Box>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
      <DialogFooter>
        <Flex gap="md" padding="xl">
          <Button onClick={handleClick}>Copy to Clipboard</Button>
        </Flex>
      </DialogFooter>
    </Dialog>
  );
};
