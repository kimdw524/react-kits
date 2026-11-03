import { theme } from '#themes';
import { styleWithComponents } from '#utils';

export const selectOption = styleWithComponents({
  display: 'block',

  width: '100%',

  padding: '0.75em 0.5em',

  border: '0',

  backgroundColor: `rgb(${theme.color.background})`,
  color: 'inherit',

  font: 'inherit',
  textAlign: 'start',
  whiteSpace: 'nowrap',

  cursor: 'pointer',
  userSelect: 'none',

  ':focus-visible': {
    outline: '0 !important',

    backgroundColor: `rgba(${theme.color.accent}, 0.5)`,
  },
});
