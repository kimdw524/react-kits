import { createVar } from '@vanilla-extract/css';

import { recipeWithLayer, styleWithLayer } from '#styleUtils';
import { spacing } from '#tokens';

export const paddingVar = createVar();

export const table = recipeWithLayer({
  base: {
    width: '100%',

    tableLayout: 'fixed',
    borderSpacing: '0',
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

export const striped = styleWithLayer({});
