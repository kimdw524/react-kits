import { useState } from 'react';

import { Button, Flex, Typography } from '@kimdw-rtk/ui';
import { useOverlay } from '@kimdw-rtk/utils';

import {
  darkThemeVars,
  lightThemeVars,
} from '../../../../packages/ui/src/themes';
import { GenerateCode, Preview, TokenEditor } from './components';
import { ThemeToggleButton } from './components/ThemeToggleButton';
import { ThemeToken } from './models';
import type { ThemeVars } from './models';

export const ThemeCustomizer = () => {
  const { push } = useOverlay();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [vars, setVars] = useState<ThemeVars>(() => ({
    borderRadius: lightThemeVars.borderRadius,
    light: ThemeToken.filterObject(lightThemeVars.color),
    dark: ThemeToken.filterObject(darkThemeVars.color),
  }));

  return (
    <Flex
      className={theme}
      flexDirection="column"
      gap="lg"
      padding="md"
      backgroundColor="background"
      isRounded
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        padding="md"
        backgroundColor="accent"
        isRounded
      >
        <ThemeToggleButton
          theme={theme}
          onClick={() =>
            setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
          }
        />
        <Button size="sm" onClick={() => push(<GenerateCode vars={vars} />)}>
          Generate Code
        </Button>
      </Flex>
      <TokenEditor vars={vars} onUpdate={setVars} />
      <Typography fontSize="lg" fontWeight="semiBold" sx={{ marginTop: 'lg' }}>
        Theme Preview
      </Typography>
      <Preview theme={theme} vars={vars} />
    </Flex>
  );
};
