import { theme } from '#themes';
import { recipeWithComponents } from '#utils';

import { isAnimated } from './TabsList.css';

export const indicator = recipeWithComponents({
  base: {
    position: 'absolute',

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
        bottom: '0',
        left: '0',

        height: 'calc((1em - 0.625em) / 2)',
        width: '100%',

        backgroundColor: `rgb(${theme.color.primary})`,
      },
      secondary: {
        inset: '0',

        '::after': {
          inset: '0.125em',
          position: 'absolute',

          borderRadius: theme.borderRadius,

          backgroundColor: `rgb(${theme.color.background})`,

          boxShadow: `0 0 0.125em 0.0625em rgba(${theme.color.border}, 0.66)`,

          content: '',
        },
      },
    },
  },
});
