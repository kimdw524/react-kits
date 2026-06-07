import { theme } from '#themes';
import { styleWithComponents } from '#utils';

export const selectOption = styleWithComponents({
  overflowX: 'hidden',

  width: '100%',

  padding: '0.75em 0.5em',

  border: '0',

  backgroundColor: `rgb(${theme.color.background})`,
  color: 'inherit',

  font: 'inherit',
  textAlign: 'start',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  cursor: 'pointer',
  userSelect: 'none',

  ':focus-visible': {
    outline: '0 !important',

    backgroundColor: `rgb(${theme.color.accent})`,
  },
});
