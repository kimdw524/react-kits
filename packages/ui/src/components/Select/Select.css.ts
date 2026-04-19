import { recipe } from '@vanilla-extract/recipes';

import { typography } from '#tokens';

export const select = recipe({
  base: {
    position: 'relative',
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
