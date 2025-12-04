import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  flex: 1,

  pointerEvents: 'none',
  userSelect: 'none',
});
