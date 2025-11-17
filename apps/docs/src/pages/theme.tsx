import { useState } from 'react';

import {
  Box,
  Button,
  darkThemeVars,
  Flex,
  lightThemeVars,
} from '@kimdw-rtk/ui';
import { useOverlay } from '@kimdw-rtk/utils';
import { type HeadFC, type PageProps } from 'gatsby';

import {
  GenerateCode,
  Preview,
  TokenEditor,
} from '@/features/theme/components';
import { ThemeToken, ThemeVars } from '@/features/theme/models';
import { Layout, ThemeToggleButton } from '@/shared/components';

const ThemePage: React.FC<PageProps> = () => {
  const { push } = useOverlay();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [vars, setVars] = useState<ThemeVars>(() => ({
    light: ThemeToken.filterObject(lightThemeVars.color),
    dark: ThemeToken.filterObject(darkThemeVars.color),
  }));

  const handleVarsUpdate = (vars: ThemeVars) => {
    setVars(vars);
  };

  return (
    <Layout size="lg">
      <Box
        className={theme}
        flex
        flexDirection="column"
        gap="lg"
        padding="md"
        backgroundColor="background"
        rounded
      >
        {/* page header */}
        <Box
          flex
          alignItems="center"
          justifyContent="space-between"
          padding="md"
          backgroundColor="accent"
          rounded
        >
          <ThemeToggleButton
            theme={theme}
            onClick={() =>
              setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
            }
          />
          <Button size="sm" onClick={() => push(<GenerateCode vars={vars} />)}>
            Generate Code
          </Button>
        </Box>
        {/* Token Editor */}
        <TokenEditor vars={vars} onUpdate={handleVarsUpdate} />
        {/* Preview samples */}
        <Preview theme={theme} vars={vars} />
      </Box>
    </Layout>
  );
};

export default ThemePage;

export const Head: HeadFC = () => (
  <>
    <title>Theme Page</title>
  </>
);
