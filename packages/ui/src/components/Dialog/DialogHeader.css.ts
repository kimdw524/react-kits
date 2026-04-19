import { style } from '@vanilla-extract/css';

import { theme } from '#themes';

export const container = style({
  position: 'sticky',
  top: '0',
  padding: '0.25rem',
  zIndex: '10',

  backgroundColor: `rgb(${theme.color.background})`,
});

export const close = style({
  width: '1.25rem',
  height: '1.25rem',
  padding: '0',
  border: '0',

  backgroundColor: 'transparent',

  fontSize: '1em',
  color: `rgb(${theme.color['muted-foreground']})`,

  cursor: 'pointer',

  transition: 'color 0.1s ease',

  ':hover': {
    color: `rgb(${theme.color['foreground']})`,
  },
});
