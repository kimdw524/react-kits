import { Box, Flex, lightThemeVars, Typography } from '@kimdw-rtk/ui';

import { GridItem } from './GridItem';

export const ColorPalette = () => {
  console.log(lightThemeVars);

  return (
    <Flex flexWrap="wrap" gap="2xl" justifyContent="space-between">
      {Object.entries(lightThemeVars.color)
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
