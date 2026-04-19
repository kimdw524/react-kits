import { theme } from '#themes';
import { styleWithComponents } from '#utils';

export const isAnimated = styleWithComponents({});

export const container = styleWithComponents({
  position: 'relative',

  display: 'flex',

  height: '2.5em',

  backgroundColor: `rgb(${theme.color.background})`,

  boxShadow: `inset 0 -0.1875em 0 rgb(${theme.color.muted})`,
});
