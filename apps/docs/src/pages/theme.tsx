import { useState } from 'react';

import { Animated } from '@kimdw-rtk/animation';
import {
  Box,
  Button,
  darkThemeVars,
  lightThemeVars,
  Typography,
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
      <Animated.Box
        duration={500}
        initial={{ opacity: 0, transform: 'translateY(1rem)' }}
        animate={{ opacity: 1, transform: 'translateY(0)' }}
      >
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
            <Button
              size="sm"
              onClick={() => push(<GenerateCode vars={vars} />)}
            >
              Generate Code
            </Button>
          </Box>
          {/* Token Editor */}
          <TokenEditor vars={vars} onUpdate={handleVarsUpdate} />
          {/* Preview samples */}
          <Typography
            fontSize="lg"
            fontWeight="semiBold"
            sx={{ marginTop: 'lg' }}
          >
            Theme Preview
          </Typography>
          <Preview theme={theme} vars={vars} />
        </Box>
      </Animated.Box>
    </Layout>
  );
};

export default ThemePage;

export const Head: HeadFC = () => (
  <>
    <title>react-kits : Customizing Theme</title>
  </>
);
