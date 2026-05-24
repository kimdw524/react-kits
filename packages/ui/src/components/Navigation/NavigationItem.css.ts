import { theme } from '#themes';
import { spacing, typography } from '#tokens';
import { recipeWithComponents } from '#utils';

import { narrow } from './NavigationDrawer.css';

export const container = recipeWithComponents({
  base: {
    position: 'relative',

    padding: spacing.lg,

    fontSize: '0.9375em',
    fontWeight: typography.weight.semiBold,
    lineHeight: '0',

    cursor: 'pointer',

    transition: 'color 0.2s ease',

    ':hover': {
      color: `rgb(${theme.color.foreground})`,
    },

    selectors: {
      [`${narrow} &`]: {
        padding: `${spacing['2xl']} ${spacing.lg}`,

        fontSize: '1.125em',
      },
    },
  },
  variants: {
    isSelected: {
      true: {
        color: `rgb(${theme.color['secondary-foreground']})`,
      },
      false: {
        color: `rgba(${theme.color['secondary-foreground']}, 0.5)`,
      },
    },
  },
});
