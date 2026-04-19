import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { spacing } from '#tokens';

export const paddingVar = createVar();

export const table = recipe({
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

export const striped = style({});
