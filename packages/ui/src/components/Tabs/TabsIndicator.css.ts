import { theme } from '#themes';
import { recipeWithComponents } from '#utils';

import { isAnimated } from './TabsList.css';

export const indicator = recipeWithComponents({
  base: {
    bottom: '0',
    left: '0',
    position: 'absolute',

    width: '100%',

    transformOrigin: '0',

    selectors: {
      [`${isAnimated} &`]: {
        display: 'none',
      },
    },
  },
  variants: {
    variant: {
      primary: {
        height: 'calc((1em - 0.625em) / 2)',

        backgroundColor: `rgb(${theme.color.primary})`,
      },
      secondary: {
        height: '100%',

        borderRadius: theme.borderRadius,

        backgroundColor: `rgb(${theme.color.primary})`,
      },
    },
  },
});
