import { theme } from '#themes';
import { styleWithComponents, recipeWithComponents } from '#utils';

import { navigationBarContainer } from './NavigationBar.css';

export const narrow = styleWithComponents({
  display: 'none',

  '@container': {
    [`${navigationBarContainer} (max-width: 800px)`]: {
      display: 'block',
    },
  },
});

export const wide = styleWithComponents({
  display: 'flex',

  alignItems: 'center',
  flexGrow: '1',
  gap: '0.5em',
  justifyContent: 'space-between',

  '@container': {
    [`${navigationBarContainer} (max-width: 800px)`]: {
      display: 'none',
    },
  },
});

export const popup = recipeWithComponents({
  base: {
    left: '0',
    position: 'absolute',
    top: '100%',
    zIndex: '100',

    height: 'calc(100vh - 100%)',
    maxHeight: '100vh',
    width: '100%',

    padding: '0.75em',

    borderBottom: `1px solid rgb(${theme.color.border})`,

    backgroundColor: `rgb(${theme.color.background})`,

    transition: 'opacity 0.2s ease',
  },

  variants: {
    isVisible: {
      true: {
        opacity: '1',
      },

      false: {
        opacity: '0',

        pointerEvents: 'none',
      },
    },
  },
});
