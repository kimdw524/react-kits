import { styleWithLayer } from '#styleUtils';
import { theme } from '#themes';

import { isAnimated } from './TabsList.css';

export const indicator = styleWithLayer({
  position: 'absolute',
  left: '0',
  bottom: '0',

  width: '100%',
  height: 'calc((1em - 0.625rem) / 2)',

  backgroundColor: `rgb(${theme.color.primary})`,

  transition: 'transform 0.25s ease',

  selectors: {
    [`${isAnimated} &`]: {
      display: 'none',
    },
  },
});
