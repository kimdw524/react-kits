import { createVar } from '@vanilla-extract/css';

import { theme } from '#themes';
import { semanticColor } from '#tokens';
import { recipeWithComponents, styleWithComponents } from '#utils';

import { scaleColor, type ScaleColor } from '../../tokens/scale/color';

const backgroundVar = createVar();

const foregroundVar = createVar();

const semanticColors = semanticColor.reduce(
  (prev, color) => ({
    ...prev,
    [color]: styleWithComponents({
      vars: {
        [backgroundVar]: theme.color[color],

        [foregroundVar]: theme.color[`${color}-foreground`],
      },
    }),
  }),
  {} as Record<(typeof semanticColor)[number], string>,
);

const scaleColors = scaleColor.reduce(
  (prev, value) => ({
    ...prev,
    [value]: styleWithComponents({
      vars: {
        [backgroundVar]: theme.color[value][500],

        [foregroundVar]: theme.color[value][50],
      },
    }),
  }),
  {} as Record<ScaleColor, string>,
);

export const chip = recipeWithComponents({
  base: {
    display: 'inline-flex',

    alignItems: 'center',
    gap: '0.125em',

    height: '2em',

    padding: '0 0.75em',

    borderRadius: theme.borderRadius,

    backgroundColor: `rgb(${backgroundVar})`,
    color: `rgb(${foregroundVar})`,

    lineHeight: '0',

    userSelect: 'none',
  },

  variants: {
    color: {
      ...semanticColors,

      ...scaleColors,
    },
  },
});
