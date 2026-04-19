import { createVar } from '@vanilla-extract/css';

import { theme } from '#themes';
import { semanticColor } from '#tokens';
import { styleWithComponents, recipeWithComponents } from '#utils';

import { SCALE_COLOR, type ScaleColor } from '../../tokens/scale/color';

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

const scaleColors = SCALE_COLOR.reduce(
  (prev, value) => ({
    ...prev,
    [value]: styleWithComponents({
      vars: {
        [backgroundVar]: theme.color[value][100],
      },
    }),
  }),
  {} as Record<ScaleColor, string>,
);

export const range = recipeWithComponents({
  base: {
    position: 'relative',

    height: '2em',
    width: '100%',

    touchAction: 'none',
    userSelect: 'none',
  },

  variants: {
    color: {
      ...semanticColors,
      ...scaleColors,
    },

    size: {
      sm: {
        fontSize: '0.75em',
      },

      md: {
        fontSize: '1em',
      },

      lg: {
        fontSize: '1.25em',
      },
    },
  },
});

export const thumb = styleWithComponents({
  position: 'absolute',
  top: '50%',

  display: 'inline-block',

  height: '1.25em',
  width: '1.25em',

  borderRadius: '50%',

  backgroundColor: `rgb(${backgroundVar})`,

  boxShadow: `0 0 0.375em 0.125em rgba(${backgroundVar}, 0.33)`,

  cursor: 'pointer',
  touchAction: 'none',

  transform: 'translate(-50%, -50%)',

  '::after': {
    inset: '0',
    position: 'absolute',

    borderRadius: '50%',

    boxShadow: `0 0 0.5em 0.125em rgba(${backgroundVar}, 0.5)`,
    opacity: '0',

    transition: 'opacity 0.2s ease',

    content: '',
  },
  '::before': {
    inset: '-0.75em',
    position: 'absolute',

    content: '',
  },

  selectors: {
    '&:hover::after': {
      opacity: '1',
    },
  },
});

export const fill = styleWithComponents({
  position: 'absolute',
  top: '0',

  height: '100%',

  backgroundColor: `rgb(${backgroundVar})`,
});

export const bar = styleWithComponents({
  position: 'absolute',
  top: '50%',

  height: '0.5em',
  width: '100%',

  borderRadius: theme.borderRadius,

  backgroundColor: `rgb(${theme.color.muted})`,

  transform: 'translateY(-50%)',
});
