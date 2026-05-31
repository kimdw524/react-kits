import { globalStyle } from '@vanilla-extract/css';

import { theme } from '#themes';

globalStyle('*', {
  boxSizing: 'border-box',

  overscrollBehavior: 'auto',
  WebkitTapHighlightColor: 'transparent',
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
