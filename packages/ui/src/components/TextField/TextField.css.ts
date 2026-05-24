import { createVar } from '@vanilla-extract/css';

import { theme } from '#themes';
import { semanticColor } from '#tokens';
import { recipeWithComponents, styleWithComponents } from '#utils';

import { scaleColor, type ScaleColor } from '../../tokens/scale/color';

const backgroundVar = createVar();

const semanticColors = semanticColor.reduce(
  (prev, color) => ({
    ...prev,
    [color]: styleWithComponents({
      vars: {
        [backgroundVar]: theme.color[color],
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
      },
    }),
  }),
  {} as Record<ScaleColor, string>,
);

export const textField = recipeWithComponents({
  base: {
    height: '2.5em',
    width: '100%',

    padding: '0 0.75em',

    border: `1px solid`,
    borderColor: ` rgb(${theme.color.border})`,
    borderRadius: theme.borderRadius,
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
  },
});
