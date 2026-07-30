import { theme } from '#themes';
import { recipeWithComponents, styleWithComponents } from '#utils';

export const isAnimated = styleWithComponents({});

export const container = recipeWithComponents({
  base: {
    position: 'relative',

    display: 'flex',

    height: '2.5em',
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: `rgb(${theme.color.background})`,

        boxShadow: `inset 0 -0.0625em 0 rgb(${theme.color.muted})`,
      },
      secondary: {
        borderRadius: theme.borderRadius,

        backgroundColor: `rgb(${theme.color.muted})`,
      },
    },
  },
});
