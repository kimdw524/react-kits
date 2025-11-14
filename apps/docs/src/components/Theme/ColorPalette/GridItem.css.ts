import { style } from '@vanilla-extract/css';

export const gridItem = style({
  display: 'inline-block',

  width: '2.5rem',
  height: '3rem',

  transition: 'all 0.1s ease',

  cursor: 'pointer',
  userSelect: 'none',

  ':hover': {
    borderRadius: '0 !important',

    transform: 'scale(1.25)',
  },

  selectors: {
    '&:first-of-type': {
      borderTopLeftRadius: '0.5rem',
      borderBottomLeftRadius: '0.5rem',
    },

    '&:last-of-type': {
      borderTopRightRadius: '0.5rem',
      borderBottomRightRadius: '0.5rem',
    },
  },
});
