import { assignVars, globalStyle } from '@vanilla-extract/css';

import { darkThemeVars, lightThemeVars, theme } from '#themes';

globalStyle('*', {
  boxSizing: 'border-box',

  overscrollBehavior: 'auto',
  WebkitTapHighlightColor: 'transparent',
});

globalStyle('.light', {
  vars: assignVars(theme, lightThemeVars),
});

globalStyle('.dark', {
  vars: assignVars(theme, darkThemeVars),
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
