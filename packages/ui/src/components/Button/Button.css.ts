import { createVar, globalStyle, keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '#themes';
import { semanticColor } from '#tokens';

import { SCALE_COLOR, type ScaleColor } from '../../tokens/scale/color';

const backgroundVar = createVar();
const foregroundVar = createVar();

const semanticColors = semanticColor.reduce(
  (prev, color) => ({
    ...prev,
    [color]: style({
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
    [value]: style({
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

export const span = recipe({
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

export const button = recipe({
  base: {
    position: 'relative',

    display: 'inline-flex',
    overflow: 'hidden',

    alignItems: 'center',
    justifyContent: 'center',

    border: '0',
    borderRadius: theme.borderRadius,

    fontSize: '1em',

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

    color: {
      ...semanticColors,
      ...scaleColors,
    },

    size: {
      sm: {
        height: '2.25em',

        padding: '0 0.75em',
      },

      md: {
        height: '2.5em',

        padding: '0 0.875em',
      },

      lg: {
        height: '2.75em',

        padding: '0 1em',
      },

      xl: {
        height: '3em',

        padding: '0 1.125em',
      },

      'icon-sm': {
        height: '2em',
        width: '2em',
      },

      'icon-md': {
        height: '2.5em',
        width: '2.5em',
      },

      'icon-lg': {
        height: '2.75em',
        width: '2.75em',
      },

      'icon-xl': {
        height: '3em',
        width: '3em',
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

export const icon = style({
  lineHeight: '0',
});

globalStyle(`${icon} > *`, {
  height: '1em',
  width: '1em',

  lineHeight: '0',

  pointerEvents: 'none',
});

globalStyle(`${button.classNames.base} svg`, {
  height: '1em',
  width: '1em',
});
