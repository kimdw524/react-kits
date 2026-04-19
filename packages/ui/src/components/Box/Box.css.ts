import { recipe } from '@vanilla-extract/recipes';

import { theme } from '#themes';

export const box = recipe({
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
