import { typography } from '#tokens';
import { recipeWithComponents } from '#utils';

export const select = recipeWithComponents({
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
