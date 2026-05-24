import { theme } from '#themes';
import { spacing } from '#tokens';
import { styleWithComponents } from '#utils';

import { narrow } from './NavigationDrawer.css';

export const navigationMenu = styleWithComponents({
  display: 'flex',

  alignItems: 'center',
  gap: '0.5em',

  selectors: {
    [`${narrow} &`]: {
      alignItems: 'stretch',
      flexDirection: 'column',
      gap: '0',

      width: '100%',

      paddingTop: spacing['md'],

      borderTop: `1px solid rgb(${theme.color['border.weak']})`,
    },
  },
});
