import { createVar, globalStyle, keyframes } from '@vanilla-extract/css';

import { theme } from '#themes';
import { semanticColor, typography } from '#tokens';
import { recipeWithComponents, styleWithComponents } from '#utils';

import { SCALE_COLOR, type ScaleColor } from '../../tokens/scale/color';

const backgroundVar = createVar();
const foregroundVar = createVar();

const semanticColors = semanticColor.reduce(
  (prev, color) => ({
    ...prev,
    [color]: styleWithComponents({
      vars: {
        [backgroundVar]: theme.color[color],
        [foregroundVar]: theme.color[`${color}-foreground`],
      },
    }),
  }),
  {} as Record<(typeof semanticColor)[number], string>,
);

const scaleColors = SCALE_COLOR.reduce(
  (prev, value) => ({
    ...prev,
    [value]: styleWithComponents({
      vars: {
        [backgroundVar]: theme.color[value][500],
        [foregroundVar]: theme.color.background,
      },
    }),
  }),
  {} as Record<ScaleColor, string>,
);

const pulse = keyframes({
  '0%': {
    backgroundPosition: '-300% 0',
  },

  '100%': {
    backgroundPosition: '300% 0',
  },
});

export const span = recipeWithComponents({
  base: {
    lineHeight: '0',
  },
  variants: {
    size: {
      sm: {
        fontSize: '0.875em',
      },

      md: {
        fontSize: '1em',
      },

      lg: {
        fontSize: '1.125em',
      },

      xl: {
        fontSize: '1.25em',
      },

      'icon-sm': {
        fontSize: '1em',
      },

      'icon-md': {
        fontSize: '1.25em',
      },

      'icon-lg': {
        fontSize: '1.5em',
      },

      'icon-xl': {
        fontSize: '1.75em',
      },
    },
  },
});

export const button = recipeWithComponents({
  base: {
    position: 'relative',

    display: 'inline-flex',
    overflow: 'hidden',

    alignItems: 'center',
    justifyContent: 'center',

    height: '2.5em',

    border: '0',
    borderRadius: theme.borderRadius,

    cursor: 'pointer',
    userSelect: 'none',

    transition: 'background-color 0.2s ease, color 0.2s ease',
  },

  variants: {
    hasIcon: {
      true: {
        gap: '0.5em',
      },
    },

    isIcon: {
      true: {
        aspectRatio: '1 / 1',

        padding: '0',
      },
      false: {
        padding: '0 0.875em',
      },
    },

    color: {
      ...semanticColors,
      ...scaleColors,
    },

    size: {
      sm: {
        fontSize: typography.size.sm,
      },

      md: {
        fontSize: typography.size.md,
      },

      lg: {
        fontSize: typography.size.lg,
      },

      xl: {
        fontSize: typography.size.xl,
      },
    },

    variant: {
      contained: {
        backgroundColor: `rgb(${backgroundVar})`,
        color: `rgb(${foregroundVar})`,

        boxShadow: `inset 0 0 0 1px rgba(255, 255, 255, 0.08)`,

        ':disabled': {
          backgroundColor: `rgb(${theme.color.muted})`,
          color: `rgb(${theme.color['muted-foreground']})`,

          cursor: 'default',
        },
      },

      outlined: {
        backgroundColor: `rgb(${theme.color.background})`,
        color: `rgb(${theme.color.foreground})`,

        boxShadow: `inset 0 0 0 1px rgb(${backgroundVar})`,

        ':disabled': {
          backgroundColor: `rgb(${theme.color.muted})`,
          color: `rgb(${theme.color['muted-foreground']})`,

          cursor: 'default',
        },
      },

      ghost: {
        background: 'transparent',
        color: `rgb(${theme.color.foreground})`,

        ':disabled': {
          color: `rgb(${theme.color['muted-foreground']})`,

          cursor: 'default',
        },
        ':hover': {
          backgroundColor: `rgba(${backgroundVar}, 0.8)`,
          color: `rgb(${foregroundVar})`,
        },
      },
    },

    pulse: {
      true: {
        '::after': {
          inset: '0',
          position: 'absolute',

          background:
            'linear-gradient(90deg, transparent 30%, #ffffff33 65%, transparent 100%)',
          backgroundSize: '300% 100%',

          animation: `${pulse} 5s linear 0s infinite`,

          content: '',
        },
      },
    },
  },
});

export const icon = recipeWithComponents({
  base: {
    lineHeight: '0',
  },
  variants: {
    isIconOnly: {
      true: {
        fontSize: '1.25em',
      },
    },
  },
});

globalStyle(`${icon} > *`, {
  lineHeight: '0',

  pointerEvents: 'none',
});
