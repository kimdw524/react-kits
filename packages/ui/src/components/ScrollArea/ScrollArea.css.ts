import { sprinklesVars } from '#styles';
import { theme } from '#themes';
import { recipeWithComponents, styleWithComponents } from '#utils';

export const scrollArea = recipeWithComponents({
  base: {
    overflowX: 'scroll',

    width: '100%',

    userSelect: 'none',
  },

  variants: {
    showScrollbar: {
      true: {
        paddingBottom: '0.25rem',

        '::-webkit-scrollbar': {
          height: '0.25rem',
          width: '0.25rem',
        },
        '::-webkit-scrollbar-button': {
          height: sprinklesVars.spacing,
          width: sprinklesVars.spacing,
        },
        '::-webkit-scrollbar-thumb': {
          borderRadius: '0.5rem',

          backgroundColor: `rgb(${theme.color['border']})`,
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
      },
      false: {
        '::-webkit-scrollbar': {
          display: 'none',
        },
      },
    },
  },
});

export const mask = styleWithComponents({
  maskImage: `linear-gradient(to right,

  transparent 0%,

  black ${sprinklesVars.spacing},

  black calc(100% - ${sprinklesVars.spacing}),

  transparent 100%)`,
});

export const wrapper = styleWithComponents({
  width: 'max-content',

  paddingInline: sprinklesVars.spacing,
});
