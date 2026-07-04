import { theme } from '#themes';
import { styleWithComponents } from '#utils';

import { isAnimated } from './TabsList.css';

export const indicator = styleWithComponents({
  bottom: '0',
  left: '0',
  position: 'absolute',

  height: 'calc((1em - 0.625em) / 2)',
  width: '100%',

  backgroundColor: `rgb(${theme.color.primary})`,

  transformOrigin: '0',

  selectors: {
    [`${isAnimated} &`]: {
      display: 'none',
    },
  },
});
