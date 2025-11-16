import { useState } from 'react';

import { darkThemeVars, Flex, lightThemeVars, Typography } from '@kimdw-rtk/ui';

import { ThemeVars } from '#types/theme.js';

import { GridItem } from './GridItem';

export const ColorPalette = () => {
  const [vars, setVars] = useState<ThemeVars>({
    light: lightThemeVars.color,
    dark: darkThemeVars.color,
  });

  return (
    <Flex flexWrap="wrap" gap="2xl" justifyContent="space-between">
      {Object.entries(vars)
        .filter(([, value]) => typeof value === 'object')
        .map(([key, value]) => (
          <div>
            <Flex gap="lg" paddingY="lg">
              <Typography fontSize="sm" fontWeight="light">
                {key}
              </Typography>
            </Flex>
            <div>
              {Object.entries(value).map(([scale, color]) => (
                <GridItem color={`rgb(${color})`} />
              ))}
            </div>
          </div>
        ))}
    </Flex>
  );
};
