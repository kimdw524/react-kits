import { globalStyle } from '@vanilla-extract/css';

import { theme } from '#themes';

globalStyle('*', {
  boxSizing: 'border-box',

  overscrollBehavior: 'auto',
  WebkitTapHighlightColor: 'transparent',
});

globalStyle('*:focus-visible', {
  outline: `0.125rem solid rgba(${theme.color.primary}, 0.66)`,
  outlineOffset: '0.125rem',
});

globalStyle('body', {
  margin: '0',

  backgroundColor: `rgb(${theme.color.background})`,
  color: `rgb(${theme.color.foreground})`,

  lineHeight: '1',
});

globalStyle('a', {
  color: 'inherit',

  textDecoration: 'none',
});

globalStyle('svg', {
  lineHeight: '0',
});
