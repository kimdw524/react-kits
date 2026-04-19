import { style } from '@vanilla-extract/css';

import { theme } from '#themes';

import * as header from './DialogHeader.css';

export const container = style({
  wordBreak: 'break-all',

  selectors: {
    [`${header.container} + &`]: {
      color: `rgb(${theme.color['muted-foreground']})`,
    },
  },
});
