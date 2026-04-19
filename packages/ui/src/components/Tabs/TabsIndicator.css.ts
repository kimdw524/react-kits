import { theme } from '#themes';
import { styleWithComponents } from '#utils';

import { isAnimated } from './TabsList.css';

export const indicator = styleWithComponents({
  bottom: '0',
  left: '0',
  position: 'absolute',

  height: 'calc((1em - 0.625rem) / 2)',
  width: '100%',

  backgroundColor: `rgb(${theme.color.primary})`,

  transition: 'transform 0.25s ease',

  selectors: {
    [`${isAnimated} &`]: {
      display: 'none',
    },
  },
});
