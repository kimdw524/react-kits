import { theme } from '#themes';
import { styleWithComponents, recipeWithComponents } from '#utils';

export const children = styleWithComponents({
  overflow: 'hidden',

  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const icon = recipeWithComponents({
  base: {
    flexShrink: '0',

    lineHeight: '0',

    transition: 'color 0.2s ease, transform 0.2s ease',
  },

  variants: {
    isActive: {
      false: {
        transform: 'rotate(0)',
      },
      true: {
        color: `rgb(${theme.color.primary})`,

        transform: 'rotate(-180deg)',
      },
    },
  },
});

export const selectTrigger = recipeWithComponents({
  base: {
    display: 'flex',

    alignItems: 'center',
    gap: '0.5em',
    justifyContent: 'space-between',

    width: '100%',

    cursor: 'pointer',
    userSelect: 'none',

    transition: 'border-color 0.2s ease',
  },

  variants: {
    isActive: {
      true: {
        borderColor: `rgb(${theme.color.primary})`,
      },
    },
    variant: {
      contained: {
        padding: '0.75em 0.75em',

        borderRadius: theme.borderRadius,

        backgroundColor: `rgb(${theme.color.secondary})`,
      },
      outlined: {
        padding: '0.75em 0.5em',

        border: '1px solid',
        borderColor: `rgb(${theme.color.border})`,
        borderRadius: theme.borderRadius,

        backgroundColor: `rgb(${theme.color.background})`,
      },
    },
  },
});
