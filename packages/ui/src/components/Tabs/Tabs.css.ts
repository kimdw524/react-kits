import { recipeWithComponents } from '#utils';

export const tabs = recipeWithComponents({
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
