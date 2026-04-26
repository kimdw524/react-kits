import { keyframes } from '@vanilla-extract/css';

import { theme } from '#themes';
import { spacing } from '#tokens';
import { styleWithComponents } from '#utils';

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },

  '100%': {
    opacity: 1,
  },
});

export const tooltip = styleWithComponents({
  left: '0',
  position: 'fixed',
  top: '50%',
  zIndex: 100,

  padding: spacing.md,

  borderRadius: theme.borderRadius,

  backgroundColor: `rgb(${theme.color.foreground})`,
  color: `rgb(${theme.color.background})`,

  pointerEvents: 'none',

  animation: `${fadeIn} 0.15s ease 1`,
  transform: 'translateX(-50%)',
});
