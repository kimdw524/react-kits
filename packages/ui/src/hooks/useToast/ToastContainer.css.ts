import { style } from '@vanilla-extract/css';

export const container = style({
  bottom: '1rem',
  left: '1rem',
  position: 'fixed',
  right: '1rem',

  display: 'flex',

  alignItems: 'flex-end',
  flexDirection: 'column-reverse',
});
