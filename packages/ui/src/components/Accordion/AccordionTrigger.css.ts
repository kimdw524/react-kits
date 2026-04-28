import { recipeWithComponents } from '#utils';

import { paddingVar } from './Accordion.css';

export const triggerContainer = recipeWithComponents({
  base: {
    display: 'flex',

    alignItems: 'center',
    gap: '0.25em',

    width: '100%',

    padding: paddingVar,

    border: '0',

    backgroundColor: 'transparent',

    fontFamily: 'inherit',
    fontSize: 'inherit',

    cursor: 'pointer',

    ':hover': {
      textDecoration: 'underline',
    },
  },

  variants: {
    iconPosition: {
      text: {},

      right: {
        justifyContent: 'space-between',
      },
    },
  },
});

export const arrow = recipeWithComponents({
  base: {
    lineHeight: '0',

    transition: 'transform 0.2s ease',
  },

  variants: {
    expand: {
      true: {
        transform: 'rotate(-180deg)',
      },

      false: {
        transform: 'rotate(0)',
      },
    },
  },
});
