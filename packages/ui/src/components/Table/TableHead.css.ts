import { theme } from '#themes';
import { styleWithComponents } from '#utils';

export const tableHead = styleWithComponents({
  padding: '0.5em 0.625em',

  color: `rgb(${theme.color['accent-foreground']})`,

  fontSize: '0.9375em',
  fontWeight: '500',
});
