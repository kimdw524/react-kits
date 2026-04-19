import { createVar } from '@vanilla-extract/css';

import { spacing } from '#tokens';
import { styleWithComponents, recipeWithComponents } from '#utils';

export const paddingVar = createVar();

export const table = recipeWithComponents({
  base: {
    width: '100%',

    borderSpacing: '0',
    tableLayout: 'fixed',
  },

  variants: {
    size: {
      sm: {
        vars: {
          [paddingVar]: spacing.sm,
        },
      },

      md: {
        vars: {
          [paddingVar]: spacing.md,
        },
      },

      lg: {
        vars: {
          [paddingVar]: spacing.lg,
        },
      },

      xl: {
        vars: {
          [paddingVar]: spacing.xl,
        },
      },
    },
  },
});

export const striped = styleWithComponents({});
