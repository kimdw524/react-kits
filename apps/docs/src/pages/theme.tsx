import { useState } from 'react';

import { Animated } from '@kimdw-rtk/animation';
import { Button, Flex, Typography } from '@kimdw-rtk/ui';
import { useOverlay } from '@kimdw-rtk/utils';
import { type HeadFC, type PageProps } from 'gatsby';

import {
  GenerateCode,
  Preview,
  TokenEditor,
} from '@/features/theme/components';
import { ThemeToken, ThemeVars } from '@/features/theme/models';
import { Layout, ThemeToggleButton } from '@/shared/components';

import {
  darkThemeVars,
  lightThemeVars,
} from '../../../../packages/ui/src/themes';

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
        <Flex
          className={theme}
          flexDirection="column"
          gap="lg"
          padding="md"
          backgroundColor="background"
          isRounded
        >
          {/* page header */}
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
                setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
              }
            />
            <Button
              size="sm"
              onClick={() => push(<GenerateCode vars={vars} />)}
            >
              Generate Code
            </Button>
          </Flex>
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
        </Flex>
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
