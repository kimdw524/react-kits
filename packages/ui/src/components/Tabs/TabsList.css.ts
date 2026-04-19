import { style } from '@vanilla-extract/css';

import { theme } from '#themes';

export const isAnimated = style({});

export const container = style({
  position: 'relative',

  display: 'flex',

  height: '2.5em',

  backgroundColor: `rgb(${theme.color.background})`,

  boxShadow: `inset 0 -0.1875em 0 rgb(${theme.color.muted})`,
});
