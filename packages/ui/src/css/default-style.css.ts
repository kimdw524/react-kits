import { assignVars, globalStyle } from '@vanilla-extract/css';

import { darkThemeVars, lightThemeVars, theme } from '#themes';

globalStyle('.light', {
  vars: assignVars(theme, lightThemeVars),
});

globalStyle('.dark', {
  vars: assignVars(theme, darkThemeVars),
});
