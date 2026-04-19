import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',

  alignItems: 'center',
  gap: '0.5em',
  justifyContent: 'space-between',

  height: '100%',

  margin: '0 auto',
});
