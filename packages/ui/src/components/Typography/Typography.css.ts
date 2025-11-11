import { recipeWithLayer } from '#styleUtils';
import { gradientFrom, gradientTo } from '#styles';

export const typography = recipeWithLayer({
  base: {
    margin: '0',
  },
  variants: {
    isEllipsis: {
      true: {
        overflow: 'hidden',

        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
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
