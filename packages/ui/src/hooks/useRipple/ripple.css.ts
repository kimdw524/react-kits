import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '#themes';

export const colorVar = createVar();

export const ripple = recipe({
  base: {
    vars: {
      [colorVar]: `color-mix(in srgb, rgba(${theme.color.accent}, 0.2) 20%, rgba(${theme.color.foreground}, 0.2) 80%)`,
    },

    left: '0',
    position: 'absolute',
    top: '0',

    borderRadius: '50%',

    backgroundColor: colorVar,

    opacity: '0',

    pointerEvents: 'none',

    transformOrigin: 'center center',
  },
  variants: {
    animation: {
      true: {
        transform: 'translate(-50%, -50%) scale(1, 1)',
        transition:
          'opacity 0.25s linear, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      },

      false: {
        transform: 'translate(-50%, -50%) scale(0.1, 0.1)',
      },
    },
  },
});
