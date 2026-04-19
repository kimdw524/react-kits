import { recipe } from '@vanilla-extract/recipes';

export const tabs = recipe({
  base: {
    width: '100%',
  },
  variants: {
    size: {
      sm: {
        fontSize: '0.875rem',
      },

      md: {
        fontSize: '1rem',
      },

      lg: {
        fontSize: '1.125rem',
      },
    },
  },
});
