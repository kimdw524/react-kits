import { globalStyle } from '@vanilla-extract/css';

import { theme } from '#themes';
import { styleWithComponents } from '#utils';

export const interaction = styleWithComponents({
  position: 'relative',

  display: 'inline-flex',
  overflow: 'hidden',

  alignItems: 'center',

  borderRadius: theme.borderRadius,

  cursor: 'pointer',
  userSelect: 'none',

  transition: 'background-color 0.15s ease',

  ':hover': {
    backgroundColor: `rgba(${theme.color.accent}, 0.33)`,
  },

  selectors: {
    '&:has(:disabled)': {
      cursor: 'default',
      pointerEvents: 'none',
    },
    '&:has(:disabled):hover': {
      backgroundColor: 'transparent',
    },
  },
});

globalStyle(`${interaction}:has(:disabled) *`, {
  cursor: 'default',
});
