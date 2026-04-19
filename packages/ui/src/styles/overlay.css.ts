import { globalStyle, style } from '@vanilla-extract/css';

export const enter = style({
  opacity: '1 !important',

  transition: 'all 0.2s ease',
});

export const base = style({
  inset: '0',
  position: 'fixed',
  zIndex: '100',

  display: 'flex',

  alignItems: 'center',
  justifyContent: 'center',

  backgroundColor: '#00000080',

  opacity: '0',
});

export const exit = style({
  opacity: '0 !important',

  pointerEvents: 'none',

  transition: 'all 0.2s ease',
});

globalStyle(`${enter} > div`, {
  transform: 'scale(1) !important',
  transition: 'all 0.2s ease',
});

globalStyle(`${base} > div`, {
  transform: 'scale(0.9)',
});

globalStyle(`${exit} > div`, {
  transform: 'scale(0.9) !important',
  transition: 'all 0.2s ease',
});
