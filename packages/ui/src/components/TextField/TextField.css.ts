import { createVar } from '@vanilla-extract/css';

import { recipeWithLayer, styleWithLayer } from '#styleUtils';
import { theme } from '#themes';
import { semanticColor, typography } from '#tokens';

import { SCALE_COLOR, type ScaleColor } from '../../tokens/scale/color';

const backgroundVar = createVar();

const semanticColors = semanticColor.reduce(
  (prev, color) => ({
    ...prev,
    [color]: styleWithLayer({
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
    [value]: styleWithLayer({
      vars: {
        [backgroundVar]: theme.color[value][500],
      },
    }),
  }),
  {} as Record<ScaleColor, string>,
);

export const textField = recipeWithLayer({
  base: {
    height: '2.5em',
    padding: '0 0.75em',
    border: `1px solid`,
    borderColor: ` rgb(${theme.color.border})`,

    backgroundColor: `rgb(${theme.color.background})`,

    color: `rgb(${theme.color.foreground})`,

    transition: 'border-color 0.15s ease, color 0.15s ease',

    outline: 'none',

    ':focus': {
      borderColor: `rgb(${backgroundVar})`,
    },

    ':disabled': {
      color: `rgb(${theme.color['muted-foreground']})`,
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
