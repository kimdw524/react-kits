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

export const radioGroup = recipeWithComponents({
  base: {
    margin: 0,
    padding: 0,

    border: 0,

    color: `rgb(${theme.color.foreground})`,
  },

  variants: {
    color: {
      ...semanticColors,
      ...scaleColors,
    },
  },
});

export const list = recipeWithComponents({
  base: {
    display: 'inline-flex',
  },

  variants: {
    orientation: {
      horizontal: {
        alignItems: 'center',
        flexDirection: 'row',
      },
      vertical: {
        flexDirection: 'column',
      },
    },
  },
});

export const legend = styleWithComponents({
  padding: 0,
});

export const item = styleWithComponents({
  display: 'inline-flex',

  alignItems: 'center',
  gap: '0.375em',

  color: `rgb(${theme.color.foreground})`,

  cursor: 'pointer',
  userSelect: 'none',

  selectors: {
    '&:has(input:disabled)': {
      cursor: 'default',
    },
  },
});

export const control = styleWithComponents({
  position: 'relative',

  display: 'inline-flex',

  alignItems: 'center',
  flexShrink: 0,
  justifyContent: 'center',

  height: '1em',
  width: '1em',
});

export const radio = styleWithComponents({
  position: 'relative',

  display: 'inline-flex',

  alignItems: 'center',
  justifyContent: 'center',

  height: '1em',
  width: '1em',

  margin: 0,

  border: `1px solid rgb(${theme.color.border})`,
  borderRadius: '50%',

  backgroundColor: `rgb(${theme.color.background})`,

  fontSize: '1em',

  appearance: 'none',
  cursor: 'pointer',

  transition: 'background-color 0.15s ease, border-color 0.15s ease',

  '::after': {
    left: '50%',
    position: 'absolute',
    top: '50%',

    height: '100%',
    width: '100%',

    borderRadius: '50%',

    backgroundColor: `rgb(${backgroundVar})`,

    opacity: 0,

    transform: 'translate(-50%, -50%) scale(0)',
    transition: 'opacity 0.15s ease, transform 0.15s ease',

    content: '',
  },
  ':checked': {
    borderColor: `rgb(${backgroundVar})`,
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
      borderColor: `rgb(${theme.color['muted-foreground']})`,
    },
    '&:checked::after': {
      opacity: 1,

      transform: 'translate(-50%, -50%) scale(0.625)',
    },
    '&:disabled:checked::after': {
      backgroundColor: `rgb(${theme.color['muted-foreground']})`,
    },
  },
});

export const text = styleWithComponents({
  selectors: {
    [`${control}:has(${radio}:disabled) + &`]: {
      color: `rgb(${theme.color['muted-foreground']})`,
    },
  },
});
