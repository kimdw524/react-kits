import { gradientFrom, gradientTo } from '#styles';
import { recipeWithComponents } from '#utils';

export const typography = recipeWithComponents({
  base: {
    margin: '0',
  },
  variants: {
    isEllipsis: {
      true: {
        overflow: 'hidden',

        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    isGradient: {
      true: {
        background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
        backgroundClip: 'text',
        color: 'transparent !important',
      },
    },
  },
});
