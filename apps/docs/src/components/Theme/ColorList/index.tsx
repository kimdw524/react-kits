import { CSSProperties } from 'react';

import { Flex, theme, Typography } from '@kimdw-rtk/ui';

import { ThemeColor } from '#types';

import { ColorItem } from '../ColorItem';

const colorGroup = [
  ['background', 'foreground'],
  ['primary', 'primary-foreground'],
  ['secondary', 'secondary-foreground'],
  ['muted', 'muted-foreground'],
  ['accent', 'accent-foreground'],
  ['border', 'border.weak'],
  ['card', 'card-foreground', 'card.gradient'],
  ['success', 'success-foreground'],
  ['danger', 'danger-foreground'],
  ['warning', 'warning-foreground'],
] satisfies (keyof ThemeColor)[][];

interface ColorListProps {
  className: string;
  header: string;
  themeColor: ThemeColor;
}

export const ColorList = ({
  className,
  header,
  themeColor,
}: ColorListProps) => {
  return (
    <div
      style={
        {
          '--border': `rgb(${theme.color.foreground})`,
        } as CSSProperties
      }
    >
      <Typography fontSize="sm" fontWeight="medium">
        {header}
      </Typography>
      <Flex className={className} flexWrap="wrap" gap="md" marginTop="md">
        {colorGroup.map((colors, index) => (
          <Flex key={index}>
            {colors.map((color) => (
              <ColorItem key={color} name={color} color={themeColor[color]} />
            ))}
          </Flex>
        ))}
      </Flex>
    </div>
  );
};
