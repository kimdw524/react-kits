import { width } from '#tokens';
import { styleWithComponents, recipeWithComponents } from '#utils';

const size = Object.entries(width).reduce(
  (prev, [key, value]) => ({
    ...prev,
    [key]: styleWithComponents({
      maxWidth: value,
    }),
  }),
  {} as Record<keyof typeof width, string>,
);

export const container = recipeWithComponents({
  base: {
    width: '100%',

    marginInline: 'auto',
  },

  variants: {
    size,
  },
});
