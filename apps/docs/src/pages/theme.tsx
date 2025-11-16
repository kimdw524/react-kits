import { useState } from 'react';

import {
  Box,
  Button,
  darkThemeVars,
  Flex,
  lightThemeVars,
} from '@kimdw-rtk/ui';
import { type HeadFC, type PageProps } from 'gatsby';

import { Layout, ThemeToggleButton } from '#components';
import { Preview, TokenEditor } from '#components/Theme';
import { ThemeColor, ThemeVars } from '#types';
import { filterObjectValue } from '#utils';

const ThemePage: React.FC<PageProps> = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [vars, setVars] = useState<ThemeVars>(() => ({
    light: filterObjectValue(lightThemeVars.color) as unknown as ThemeColor,
    dark: filterObjectValue(darkThemeVars.color) as unknown as ThemeColor,
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
        <Box
          flex
          alignItems="center"
          justifyContent="space-between"
          padding="md"
          backgroundColor="accent"
          rounded
        >
          <Flex alignItems="center" gap="sm">
            <ThemeToggleButton
              theme={theme}
              onClick={() =>
                setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
              }
            />
          </Flex>
          <div>
            <Button size="sm">Generate Code</Button>
          </div>
        </Box>
        <TokenEditor vars={vars} onUpdate={handleVarsUpdate} />
        <Preview theme={theme} vars={vars} />
      </Box>
    </Layout>
  );
};

export default ThemePage;

export const Head: HeadFC = () => (
  <>
    <title>Theme Page</title>
    <body className="light" />
  </>
);
