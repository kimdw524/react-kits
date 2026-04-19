import { style } from '@vanilla-extract/css';

import { theme } from '#themes';

export const container = style({
  position: 'sticky',
  top: '0',
  zIndex: '10',

  padding: '0.25rem',

  backgroundColor: `rgb(${theme.color.background})`,
});

export const close = style({
  height: '1.25rem',
  width: '1.25rem',

  padding: '0',

  border: '0',

  backgroundColor: 'transparent',
  color: `rgb(${theme.color['muted-foreground']})`,

  fontSize: '1em',

  cursor: 'pointer',

  transition: 'color 0.1s ease',

  ':hover': {
    color: `rgb(${theme.color['foreground']})`,
  },
});
