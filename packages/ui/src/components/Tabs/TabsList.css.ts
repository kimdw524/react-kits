import { theme } from '#themes';
import { recipeWithComponents, styleWithComponents } from '#utils';

export const isAnimated = styleWithComponents({});

export const container = recipeWithComponents({
  base: {
    position: 'relative',

    display: 'flex',

    height: '2.5em',

    backgroundColor: `rgb(${theme.color.background})`,
  },

  variants: {
    variant: {
      primary: {
        boxShadow: `inset 0 -0.1875em 0 rgb(${theme.color.muted})`,
      },
      secondary: {
        // boxShadow: `inset 0 -0.1875em 0 rgb(${theme.color.muted})`,
      },
    },
  },
});
