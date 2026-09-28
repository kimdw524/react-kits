import { theme } from '#themes';
import { styleWithComponents } from '#utils';

import { bordered, striped } from './Table.css';
import { interactive } from './TableRow.css';

export const tableCell = styleWithComponents({
  padding: '0.75em',

  selectors: {
    [`${interactive} > &`]: {
      cursor: 'pointer',
    },

    [`${bordered} tbody > tr > &`]: {
      borderBottom: `1px solid rgb(${theme.color['border.weak']})`,
    },

    'tbody > tr:hover > &': {
      backgroundColor: `rgb(${theme.color.accent})`,
      color: `rgb(${theme.color['accent-foreground']})`,
    },

    [`${striped} tbody > tr:nth-of-type(odd) > &`]: {
      backgroundColor: `rgb(${theme.color.card})`,
      color: `rgb(${theme.color['accent-foreground']})`,
    },

    [`${striped} > tbody > tr:nth-of-type(odd):hover > &`]: {
      backgroundColor: `rgb(${theme.color.accent})`,
    },
  },
});
