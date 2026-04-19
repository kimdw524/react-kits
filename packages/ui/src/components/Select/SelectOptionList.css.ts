import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '#themes';

const fadeIn = keyframes({
  '0%': {
    opacity: 0,

    transform: 'scale(0.95)',
  },

  '100%': {
    opacity: 1,

    transform: 'scale(1)',
  },
});

export const container = recipe({
  base: {
    position: 'absolute',
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

    isAbove: {
      true: {
        top: '100%',
      },
      false: {
        bottom: '100%',
      },
    },
  },
});
