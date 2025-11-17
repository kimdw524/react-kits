import { useMemo } from 'react';

import { Animated } from '@kimdw-rtk/animation';
import { Flex, theme as themeCss } from '@kimdw-rtk/ui';

import { ThemeToken, ThemeVars } from '../../models';
import { Confirm } from './Confirm';
import { Payments } from './Payments';
import { PictureCard } from './PictureCard';
import { Profile } from './Profile';
import { Search } from './Search';
import { SignIn } from './SignIn';

interface PreviewProps {
  theme: 'light' | 'dark';
  vars: ThemeVars;
}

export const Preview = ({ theme, vars }: PreviewProps) => {
  const cssVars = useMemo(() => {
    const inlineVars: Record<string, string> = {};

    for (const key in vars[theme]) {
      const strippedKey = themeCss.color[key as keyof ThemeToken]
        .split('var(')![1]
        .split(')')![0];
      inlineVars[strippedKey] = vars[theme][key as keyof ThemeToken];
    }

    return inlineVars;
  }, [theme, vars]);

  return (
    <Animated.Box
      duration={800}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Flex
        gap="xl"
        alignItems="flex-start"
        justifyContent="center"
        flexWrap="wrap"
        backgroundColor="background"
        style={cssVars}
      >
        <Flex
          flexDirection="column"
          flexShrink="0"
          gap="xl"
          style={{ flex: 3.5, flexBasis: '350px' }}
        >
          <SignIn />
          <Profile />
        </Flex>
        <Flex
          flexDirection="column"
          flexShrink="0"
          gap="xl"
          style={{ flex: 4, flexBasis: '400px' }}
        >
          <Payments />
          <Search />
        </Flex>
        <Flex
          flexDirection="column"
          flexShrink="0"
          gap="xl"
          style={{ flex: 3, flexBasis: '300px' }}
        >
          <PictureCard />
          <Confirm />
        </Flex>
      </Flex>
    </Animated.Box>
  );
};
