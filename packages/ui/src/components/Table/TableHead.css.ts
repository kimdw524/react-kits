import { theme } from '#themes';
import { styleWithComponents } from '#utils';

import { paddingVar } from './Table.css';

export const tableHead = styleWithComponents({
  padding: paddingVar,

  color: `rgb(${theme.color['accent-foreground']})`,

  fontSize: '0.9375em',
  fontWeight: '500',
});
