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
        [foregroundVar]: theme.color.background,
      },
    }),
  }),
  {} as Record<ScaleColor, string>,
);

export const container = styleWithComponents({
  display: 'inline-flex',

  alignItems: 'center',
  gap: '0.375em',

  color: `rgb(${theme.color.foreground})`,

  userSelect: 'none',
});

export const control = styleWithComponents({
  position: 'relative',

  display: 'inline-flex',

  alignItems: 'center',
  flexShrink: '0',
  justifyContent: 'center',

  height: '1em',
  width: '1em',
});

export const checkbox = recipeWithComponents({
  base: {
    display: 'inline-flex',

    height: '1em',
    width: '1em',

    margin: '0',

    border: `1px solid rgb(${theme.color.border})`,
    borderRadius: `calc(${theme.borderRadius} / 1.5)`,

    backgroundColor: `rgb(${theme.color.background})`,

    fontSize: '1em',

    appearance: 'none',
    cursor: 'pointer',

    transition: 'background-color 0.15s ease, border-color 0.15s ease',

    ':checked': {
      borderColor: `rgb(${backgroundVar})`,

      backgroundColor: `rgb(${backgroundVar})`,
    },
    ':disabled': {
      borderColor: `rgb(${theme.color.border})`,

      backgroundColor: `rgb(${theme.color.muted})`,

      cursor: 'default',
    },
    ':focus-visible': {
      outline: `0.125rem solid rgb(${theme.color.primary})`,
      outlineOffset: '0.125rem',
    },

    selectors: {
      '&:disabled:checked': {
        backgroundColor: `rgb(${theme.color.muted})`,
      },
    },
  },

  variants: {
    color: {
      ...semanticColors,
      ...scaleColors,
    },
  },
});

export const icon = styleWithComponents({
  position: 'absolute',

  height: '0.8em',
  width: '0.8em',

  color: `rgb(${theme.color.background})`,

  opacity: 0,

  pointerEvents: 'none',

  transform: 'scale(0)',
  transition: 'opacity 0.1s ease, transform 0.15s ease',

  selectors: {
    [`${checkbox.classNames.base}:checked + &`]: {
      opacity: 1,

      transform: 'scale(1)',
    },
    [`${checkbox.classNames.base}:disabled:checked + &`]: {
      color: `rgb(${theme.color['muted-foreground']})`,
    },
  },
});

export const text = styleWithComponents({
  selectors: {
    [`${control}:has(${checkbox.classNames.base}:disabled) + &`]: {
      color: `rgb(${theme.color['muted-foreground']})`,
    },
  },
});
