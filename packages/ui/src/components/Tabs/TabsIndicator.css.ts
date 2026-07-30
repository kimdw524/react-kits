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

        height: '0.1875em',
        width: '100%',

        backgroundColor: `rgb(${theme.color.primary})`,
      },
      secondary: {
        inset: '0',

        '::after': {
          inset: '0.25em',
          position: 'absolute',

          borderRadius: theme.borderRadius,

          backgroundColor: `rgb(${theme.color.background})`,

          content: '',
        },
      },
    },
  },
});
