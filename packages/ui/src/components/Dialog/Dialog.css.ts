import { style } from '@vanilla-extract/css';

import { theme } from '#themes';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  overflowY: 'auto',

  maxWidth: 'calc(100vw - 2rem)',
  minWidth: 'min(20rem, calc(100vw - 2rem))',
  maxHeight: 'calc(100vh - 2rem)',
  borderRadius: theme.borderRadius,
  boxSizing: 'border-box',

  backgroundColor: `rgb(${theme.color.background})`,
});

export const message = style({
  marginBottom: '1rem',

  lineHeight: '150%',
  wordBreak: 'break-all',
});
