import { keyframes } from '@vanilla-extract/css';

import { theme } from '#themes';
import { recipeWithComponents, styleWithComponents } from '#utils';

const fadeIn = keyframes({
  '0%': {
    opacity: 0,

    transform: 'scaleY(0.9)',
  },

  '100%': {
    opacity: 1,

    transform: 'scaleY(1)',
  },
});

export const block = styleWithComponents({
  inset: '0',
  position: 'fixed',
});

export const container = recipeWithComponents({
  base: {
    position: 'fixed',
    zIndex: '10',

    overflowY: 'auto',

    width: '100%',

    margin: '0.5rem 0',

    border: `1px solid rgb(${theme.color.border})`,
    borderRadius: theme.borderRadius,

    backgroundColor: `rgb(${theme.color.background})`,

    userSelect: 'none',

    animation: `${fadeIn} 0.3s ease 1`,
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
      },
      false: {
        display: 'none',
      },
    },
  },
});
