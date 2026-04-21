import { createVar } from '@vanilla-extract/css';

import { theme } from '#themes';
import { semanticColor, spacing } from '#tokens';
import { styleWithComponents, recipeWithComponents } from '#utils';

import { scaleColor, type ScaleColor } from '../../tokens/scale/color';
import { cardInteraction } from './CardInteraction.css';

export const paddingVar = createVar();

const semanticColors = semanticColor.reduce(
  (prev, color) => ({
    ...prev,
    [color]: styleWithComponents({
      backgroundColor: `rgb(${theme.color[color]})`,
    }),
  }),
  {} as Record<(typeof semanticColor)[number], string>,
);

const scaleColors = scaleColor.reduce(
  (prev, value) => ({
    ...prev,
    [value]: styleWithComponents({
      backgroundColor: `color-mix(in srgb, rgb(${theme.color[value][500]}) 20%, rgb(${theme.color.background}) 80%)`,
    }),
  }),
  {} as Record<ScaleColor, string>,
);

export const card = recipeWithComponents({
  base: {
    position: 'relative',

    display: 'flex',
    overflow: 'clip',

    flexDirection: 'column',

    borderRadius: theme.borderRadius,

    color: `rgb(${theme.color.foreground})`,

    transition: 'border-color 0.2s ease, transform 0.4s ease',

    selectors: {
      [`&:has(${cardInteraction}:hover)`]: {
        borderColor: `color-mix(in srgb, rgb(${theme.color.primary}) 10%, rgb(${theme.color.border}) 90%)`,
      },

      [`&:has(${cardInteraction}:active)`]: {
        borderColor: `color-mix(in srgb, rgb(${theme.color.primary}) 40%, rgb(${theme.color.border}) 60%)`,
      },
    },
  },
  variants: {
    variant: {
      contained: {},

      outlined: {
        border: '1px solid',
        borderColor: `rgb(${theme.color.border})`,
      },
    },

    color: {
      ...semanticColors,
      ...scaleColors,
      transparent: {
        backgroundColor: 'transparent',
      },
    },

    size: {
      sm: {
        vars: {
          [paddingVar]: spacing.sm,
        },
      },

      md: {
        vars: {
          [paddingVar]: spacing.md,
        },
      },

      lg: {
        vars: {
          [paddingVar]: spacing.lg,
        },
      },

      xl: {
        vars: {
          [paddingVar]: spacing.xl,
        },
      },

      '2xl': {
        vars: {
          [paddingVar]: spacing['2xl'],
        },
      },
    },
  },
});
