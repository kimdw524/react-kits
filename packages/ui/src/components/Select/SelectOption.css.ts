import { styleWithLayer } from '#styleUtils';
import { theme } from '#themes';

export const selectOption = styleWithLayer({
  overflowX: 'hidden',

  padding: '0.75em 0.5em',

  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  transition: 'background-color 0.2s ease',

  cursor: 'default',

  ':hover': {
    backgroundColor: `rgb(${theme.color.accent})`,
  },
});
