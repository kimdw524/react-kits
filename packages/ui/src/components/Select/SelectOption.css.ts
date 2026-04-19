import { theme } from '#themes';
import { styleWithComponents } from '#utils';

export const selectOption = styleWithComponents({
  overflowX: 'hidden',

  padding: '0.75em 0.5em',

  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  cursor: 'default',

  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: `rgb(${theme.color.accent})`,
  },
});
