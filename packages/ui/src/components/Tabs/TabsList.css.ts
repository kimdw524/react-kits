import { style } from '@vanilla-extract/css';

import { styleWithLayer } from '#styleUtils';
import { theme } from '#themes';

export const isAnimated = style({});

export const container = styleWithLayer({
  display: 'flex',

  position: 'relative',
  height: '2.5em',

  boxShadow: `inset 0 -0.1875em 0 rgb(${theme.color.muted})`,
  backgroundColor: `rgb(${theme.color.background})`,
});
