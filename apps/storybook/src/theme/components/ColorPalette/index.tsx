import { Flex, Tooltip } from '@kimdw-rtk/ui';
import { lightColor } from '@kimdw-rtk/ui/token';

import { GridItem } from './GridItem';

interface ColorPaletteProps {
  onClick: (color: string) => void;
}

export const ColorPalette = ({ onClick }: ColorPaletteProps) => {
  return (
    <Flex flexWrap="wrap" gap="sm" justifyContent="space-between">
      {Object.entries(lightColor)
        .filter(([, value]) => typeof value === 'object')
        .map(([key, value]) => (
          <div key={key}>
            {Object.entries(value).map(([scale, color]) => (
              <Tooltip key={scale} content={`${key}-${scale}`}>
                <GridItem
                  color={`rgb(${color})`}
                  onClick={() => onClick(color)}
                />
              </Tooltip>
            ))}
          </div>
        ))}
    </Flex>
  );
};
