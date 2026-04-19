import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { width } from '#tokens';

const size = Object.entries(width).reduce(
  (prev, [key, value]) => ({
    ...prev,
    [key]: style({
      maxWidth: value,
    }),
  }),
  {} as Record<keyof typeof width, string>,
);

export const container = recipe({
  base: {
    marginInline: 'auto',
    width: '100%',
  },

  variants: {
    size,
  },
});
