import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '#themes';

export const paddingVar = createVar();

export const accordion = recipe({
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
