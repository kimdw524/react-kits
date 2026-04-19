import { theme } from '#themes';
import { recipeWithComponents } from '#utils';

export const box = recipeWithComponents({
  variants: {
    flex: {
      true: {
        display: 'flex',
      },
    },

    rounded: {
      true: {
        borderRadius: theme.borderRadius,
      },
    },
  },
});
