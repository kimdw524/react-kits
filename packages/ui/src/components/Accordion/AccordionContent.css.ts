import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { paddingVar } from './Accordion.css';

export const container = recipe({
  base: {
    overflow: 'hidden',

    transition: 'height 0.2s ease, opacity 0.2s ease',
  },

  variants: {
    isExpanded: {
      true: {
        opacity: '1',
      },

      false: {
        height: '0',

        opacity: '0',
      },
    },
  },
});

export const inner = style({
  padding: paddingVar,
});
