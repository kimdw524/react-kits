import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  minHeight: 'calc(100vh - 4em)',
});

export const inner = style({
  position: 'absolute',
  top: 'calc(50% - 2em)',
  width: '100%',

  transform: 'translateY(-50%)',
});
