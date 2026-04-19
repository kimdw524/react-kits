import { createVar, keyframes } from '@vanilla-extract/css';

import { theme } from '#themes';
import { semanticColor } from '#tokens';
import { styleWithComponents, recipeWithComponents } from '#utils';

const colorVar = createVar();

const foregroundVar = createVar();

const semanticColors = semanticColor.reduce(
  (prev, color) => ({
    ...prev,

    [color]: styleWithComponents({
      vars: {
        [colorVar]: theme.color[color],

        [foregroundVar]: theme.color[`${color}-foreground`],
      },
    }),
  }),
  {} as Record<(typeof semanticColor)[number], string>,
);

const fill = keyframes({
  '0%': {
    transform: 'scaleX(0)',
  },

  '100%': {
    transform: 'scaleX(1)',
  },
});

export const progress = recipeWithComponents({
  base: {
    inset: '0',
    position: 'absolute',

    width: '100%',

    backgroundColor: `rgba(${foregroundVar}, 0.25)`,

    transformOrigin: '0 0',
  },

  variants: {
    animation: {
      true: {
        animationFillMode: 'forwards',
        animationIterationCount: '1',
        animationName: fill,
        animationTimingFunction: 'linear',
      },
      false: {
        display: 'none',
      },
    },
  },
});

export const toast = recipeWithComponents({
  base: {
    position: 'relative',

    overflow: 'hidden',

    padding: '0.875em',

    backgroundColor: `rgb(${colorVar})`,
    color: `rgb(${foregroundVar})`,

    whiteSpace: 'nowrap',
    wordBreak: 'break-all',

    cursor: 'pointer',
  },
  variants: {
    color: {
      ...semanticColors,
    },
  },
});
