import { createVar } from '@vanilla-extract/css';

import { theme } from '#themes';
import { recipeWithComponents } from '#utils';

export const paddingVar = createVar();

export const accordion = recipeWithComponents({
  base: {
    width: '100%',

    borderBottom: `1px solid rgb(${theme.color.border})`,
  },

  variants: {
    isPadding: {
      true: {
        vars: {
          [paddingVar]: '0.75em',
        },
      },

      false: {
        vars: {
          [paddingVar]: '0.75em 0',
        },
      },
    },
  },
});
