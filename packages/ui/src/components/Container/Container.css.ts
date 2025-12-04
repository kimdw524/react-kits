import { recipeWithLayer, styleWithLayer } from '#styleUtils';
import { width } from '#tokens';

const size = Object.entries(width).reduce(
  (prev, [key, value]) => ({
    ...prev,
    [key]: styleWithLayer({ maxWidth: value }),
  }),
  {} as Record<keyof typeof width, string>,
);

export const container = recipeWithLayer({
  base: {
    marginInline: 'auto',
    width: '100%',
  },

  variants: {
    size,
  },
});
