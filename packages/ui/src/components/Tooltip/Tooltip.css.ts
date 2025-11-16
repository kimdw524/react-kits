import { keyframes } from '@vanilla-extract/css';

import { recipeWithLayer } from '#styleUtils';
import { theme } from '#themes';
import { spacing, typography } from '#tokens';

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },

  '100%': {
    opacity: 1,
  },
});

export const tooltip = recipeWithLayer({
  base: {
    position: 'fixed',
    zIndex: 100,
    top: '50%',
    left: '0',
    padding: spacing.md,
    borderRadius: theme.borderRadius,

    backgroundColor: `rgb(${theme.color.foreground})`,

    color: `rgb(${theme.color.background})`,

    transform: 'translateX(-50%)',
    animation: `${fadeIn} 0.15s ease 1`,

    pointerEvents: 'none',
  },

  variants: {
    size: {
      sm: {
        fontSize: typography.size.sm,
      },
      md: {
        fontSize: typography.size.md,
      },
      lg: {
        fontSize: typography.size.lg,
      },
    },
  },
});
