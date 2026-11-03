import { keyframes } from '@vanilla-extract/css';

import { theme } from '#themes';
import { recipeWithComponents, styleWithComponents } from '#utils';

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const block = styleWithComponents({
  inset: '0',
  position: 'fixed',
});

export const container = recipeWithComponents({
  base: {
    position: 'fixed',

    overflowY: 'auto',

    width: 'max-content',

    margin: '0.375rem 0',

    border: `1px solid rgb(${theme.color.border})`,
    borderRadius: theme.borderRadius,

    backgroundColor: `rgb(${theme.color.background})`,

    userSelect: 'none',

    transformOrigin: '0 0',

    '::-webkit-scrollbar': {
      height: '0.25rem',
      width: '0.25rem',
    },
    '::-webkit-scrollbar-thumb': {
      borderRadius: '0.5rem',

      backgroundColor: `rgb(${theme.color['muted-foreground']})`,
    },
  },

  variants: {
    isVisible: {
      true: {
        display: 'block',

        animation: `${fadeIn} 0.1s ease 1`,
      },
      false: {
        display: 'none',
      },
    },
  },
});
