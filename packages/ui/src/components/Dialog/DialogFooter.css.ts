import { styleWithComponents } from '#utils';

export const container = styleWithComponents({
  boxSizing: 'border-box',

  maxWidth: 'calc(100vw - 2rem)',
  minWidth: 'min(20rem, calc(100vw - 2rem))',

  padding: '1rem',

  borderRadius: '0.25rem',

  backgroundColor: '#fff',

  userSelect: 'none',
});

export const message = styleWithComponents({
  marginBottom: '1rem',

  lineHeight: '150%',
  wordBreak: 'break-all',
});
