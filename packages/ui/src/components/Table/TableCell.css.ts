import { theme } from '#themes';
import { styleWithComponents } from '#utils';

import { bordered, striped } from './Table.css';
import { interactive } from './TableRow.css';

export const tableCell = styleWithComponents({
  padding: '0.75em',

  transition: 'background-color 0.1s ease',

  selectors: {
    [`${interactive} > &`]: {
      cursor: 'pointer',
    },

    [`${bordered} tbody > tr > &`]: {
      borderBottom: `1px solid rgb(${theme.color['border.weak']})`,
    },

    [`:not(${striped}) > tbody > tr.${interactive}:hover:not(:active) > &`]: {
      backgroundColor: `rgb(${theme.color.card})`,
    },

    [`:not(${striped}) > tbody > tr.${interactive}:active > &`]: {
      backgroundColor: `rgb(${theme.color.secondary})`,
    },

    [`${striped} > tbody > tr.${interactive}:hover > &`]: {
      backgroundColor: `rgb(${theme.color.accent})`,
    },

    [`${striped} tbody > tr:nth-of-type(odd) > &`]: {
      backgroundColor: `rgb(${theme.color.card})`,
    },

    [`${striped} > tbody > tr.${interactive}:nth-of-type(odd):hover > &`]: {
      backgroundColor: `rgb(${theme.color.accent})`,
    },
  },
});
