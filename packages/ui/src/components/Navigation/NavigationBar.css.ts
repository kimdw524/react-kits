import { createContainer } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '#themes';

export const navigationBarContainer = createContainer();

export const navigationBar = recipe({
  base: {
    position: 'sticky',
    top: '0',
    zIndex: '20',

    width: '100%',

    borderBottom: '1px solid',

    backgroundColor: `rgba(${theme.color.background}, 0.75)`,
    color: `rgb(${theme.color.border})`,

    backdropFilter: 'blur(2rem) saturate(150%)',

    transition: 'border-bottom-color 0.2s ease',

    containerName: navigationBarContainer,
    containerType: 'inline-size',
  },
  variants: {
    size: {
      sm: {
        height: '4em',
      },

      md: {
        height: '5em',
      },

      lg: {
        height: '6em',
      },
    },
    isStuck: {
      true: {
        borderBottomColor: `rgb(${theme.color.border})`,
      },
      false: {
        borderBottomColor: 'transparent',
      },
    },
  },
});
