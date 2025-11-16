import {
  Button,
  darkColor,
  Flex,
  lightColor,
  ScrollArea,
  theme,
  Typography,
} from '@kimdw-rtk/ui';

import { ThemeVars } from '#types';

const presets = [
  'blue',
  'cyan',
  'fuchsia',
  'gray',
  'green',
  'indigo',
  'lime',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'violet',
  'yellow',
  'amber',
  'emerald',
  'sky',
  'rose',
  'slate',
  'zinc',
  'neutral',
  'stone',
] as const satisfies (keyof typeof theme.color)[];

interface ThemePresetProps {
  onUpdate: (vars: ThemeVars) => void;
}

export const ThemePreset = ({ onUpdate }: ThemePresetProps) => {
  const handleClick = (color: (typeof presets)[number]) => {
    onUpdate({
      light: {
        background: '255, 255, 255',
        foreground: '10, 10, 11',
        primary: lightColor[color][500],
        'primary-foreground': '240, 248, 255',
        secondary: '240, 242, 245',
        'secondary-foreground': '48, 48, 49',
        muted: '234, 239, 245',
        'muted-foreground': '120, 120, 120',
        accent: lightColor[color][100],
        'accent-foreground': '32, 32, 33',
        border: '203, 213, 225',
        'border.weak': '220, 229, 237',
        card: lightColor[color][50],
        'card-foreground': '10, 10, 11',
        'card.gradient': lightColor[color][300],
        success: '34, 197, 94',
        'success-foreground': '255, 255, 255',
        danger: '239, 68, 68',
        'danger-foreground': '255, 255, 255',
        warning: '251, 191, 36',
        'warning-foreground': '49, 36, 0',
      },
      dark: {
        background: '12, 12, 14',
        foreground: '238, 238, 238',
        primary: darkColor[color][500],
        'primary-foreground': '238, 238, 238',
        secondary: '32, 38, 45',
        'secondary-foreground': '212, 212, 213',
        muted: '30, 36, 44',
        'muted-foreground': '102, 112, 133',
        accent: darkColor[color][800],
        'accent-foreground': darkColor[color][50],
        border: '38, 43, 51',
        'border.weak': '32, 32, 32',
        card: darkColor[color][900],
        'card-foreground': '238, 238, 238',
        'card.gradient': darkColor[color][700],
        success: '22, 163, 74',
        'success-foreground': '255, 255, 255',
        danger: '220, 38, 38',
        'danger-foreground': '255, 255, 255',
        warning: '202, 138, 4',
        'warning-foreground': '30, 23, 0',
      },
    });
  };

  return (
    <div>
      <Typography fontSize="sm" fontWeight="medium">
        Theme Presets
      </Typography>
      <ScrollArea>
        <Flex flexWrap="wrap" gap="md" marginTop="md">
          {presets.map((preset) => (
            <Button
              key={preset}
              color={preset}
              size="sm"
              onClick={() => handleClick(preset)}
            >
              {preset}
            </Button>
          ))}
        </Flex>
      </ScrollArea>
    </div>
  );
};
