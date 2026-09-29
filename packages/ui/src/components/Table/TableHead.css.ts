import { theme } from '#themes';
import { styleWithComponents } from '#utils';

import { bordered } from './Table.css';

export const tableHead = styleWithComponents({
  padding: '0.75em',

  color: `rgb(${theme.color.foreground})`,

  fontSize: '0.9375em',
  fontWeight: '500',

  selectors: {
    [`${bordered} thead > tr > &`]: {
      borderBottom: `1px solid rgb(${theme.color.border})`,
    },
  },
});
