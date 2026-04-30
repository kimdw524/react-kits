import { theme } from '#themes';
import { recipeWithComponents } from '#utils';

export const box = recipeWithComponents({
  variants: {
    isRounded: {
      true: {
        borderRadius: theme.borderRadius,
      },
    },
  },
});
