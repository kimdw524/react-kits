import { style } from '@vanilla-extract/css';

export const box = style({
  position: 'relative',
  width: '2rem',
  height: '2rem',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--border)',
  borderRightWidth: 0,

  cursor: 'pointer',

  selectors: {
    '&:last-of-type': {
      borderRightWidth: 1,
    },
  },
});
