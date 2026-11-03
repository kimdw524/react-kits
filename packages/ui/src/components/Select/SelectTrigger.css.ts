import { createVar } from '@vanilla-extract/css';

import { colors } from '#styles';
import { theme } from '#themes';
import { styleWithComponents, recipeWithComponents } from '#utils';

const backgroundVar = createVar();

export const containedColors = Object.fromEntries(
  Object.entries(colors).map(([color, value]) => [
    color,
    styleWithComponents({
      vars: { [backgroundVar]: value },
    }),
  ]),
) as Record<keyof typeof colors, string>;

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

    border: '0',

    color: 'inherit',

    font: 'inherit',

    cursor: 'pointer',
    userSelect: 'none',

    transition: 'background-color 0.1s ease, border-color 0.1s ease',
  },

  variants: {
    variant: {
      contained: {
        padding: '0.75em 0.75em',

        borderRadius: theme.borderRadius,

        backgroundColor: backgroundVar,

        ':hover': {
          backgroundColor: `color-mix(in srgb, ${backgroundVar} 60%, rgb(${theme.color.accent}) 40%)`,
        },
      },
      outlined: {
        padding: '0.75em 0.5em',

        border: '1px solid',
        borderRadius: theme.borderRadius,

        backgroundColor: `rgb(${theme.color.background})`,
      },
    },
  },
});
