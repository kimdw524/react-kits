import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '#themes';
import { semanticColor, typography } from '#tokens';

import { SCALE_COLOR, type ScaleColor } from '../../tokens/scale/color';

const backgroundVar = createVar();

const semanticColors = semanticColor.reduce(
  (prev, color) => ({
    ...prev,
    [color]: style({
      vars: {
        [backgroundVar]: theme.color[color],
      },
    }),
  }),
  {} as Record<(typeof semanticColor)[number], string>,
);

const scaleColors = SCALE_COLOR.reduce(
  (prev, value) => ({
    ...prev,
    [value]: style({
      vars: {
        [backgroundVar]: theme.color[value][500],
      },
    }),
  }),
  {} as Record<ScaleColor, string>,
);

export const textField = recipe({
  base: {
    height: '2.5em',
    width: '100%',

    padding: '0 0.75em',

    border: `1px solid`,
    borderColor: ` rgb(${theme.color.border})`,
    outline: 'none',

    backgroundColor: `rgb(${theme.color.background})`,
    color: `rgb(${theme.color.foreground})`,

    transition: 'border-color 0.15s ease, color 0.15s ease',

    ':disabled': {
      color: `rgb(${theme.color['muted-foreground']})`,
    },
    ':focus': {
      borderColor: `rgb(${backgroundVar})`,
    },
  },
  variants: {
    color: {
      ...semanticColors,
      ...scaleColors,
    },

    size: {
      sm: {
        borderRadius: theme.borderRadius,

        fontSize: typography.size.sm,
      },
      md: {
        borderRadius: theme.borderRadius,

        fontSize: typography.size.md,
      },
      lg: {
        borderRadius: theme.borderRadius,

        fontSize: typography.size.lg,
      },
    },
  },
});
