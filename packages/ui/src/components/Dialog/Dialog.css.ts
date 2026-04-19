import { style } from '@vanilla-extract/css';

import { theme } from '#themes';

export const container = style({
  boxSizing: 'border-box',
  display: 'flex',
  overflowY: 'auto',

  flexDirection: 'column',
  gap: '1rem',

  maxHeight: 'calc(100vh - 2rem)',
  maxWidth: 'calc(100vw - 2rem)',
  minWidth: 'min(20rem, calc(100vw - 2rem))',

  borderRadius: theme.borderRadius,

  backgroundColor: `rgb(${theme.color.background})`,
});

export const message = style({
  marginBottom: '1rem',

  lineHeight: '150%',
  wordBreak: 'break-all',
});
