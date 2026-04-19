import { recipe } from '@vanilla-extract/recipes';

import { gradientFrom, gradientTo } from '#styles';

export const typography = recipe({
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
