import { theme } from '#themes';
import { styleWithComponents } from '#utils';

import { paddingVar, striped } from './Table.css';
import { interactive } from './TableRow.css';

export const tableCell = styleWithComponents({
  paddingBlock: paddingVar,
  paddingInline: `calc(${paddingVar} / 2)`,

  transition: 'background-color 0.1s ease, color 0.1s ease',

  selectors: {
    [`${interactive} > &`]: {
      cursor: 'pointer',
    },

    'tr > &:first-child': {
      paddingLeft: paddingVar,

      borderBottomLeftRadius: theme.borderRadius,
      borderTopLeftRadius: theme.borderRadius,
    },

    'tr > &:last-child': {
      paddingRight: paddingVar,

      borderBottomRightRadius: theme.borderRadius,
      borderTopRightRadius: theme.borderRadius,
    },

    'tbody > tr:hover > &': {
      backgroundColor: `rgb(${theme.color.accent})`,
      color: `rgb(${theme.color['accent-foreground']})`,
    },

    [`${striped} > tbody > tr:nth-of-type(odd) > &`]: {
      backgroundColor: `rgb(${theme.color.card})`,
      color: `rgb(${theme.color['accent-foreground']})`,
    },

    [`${striped} > tbody > tr:nth-of-type(odd):hover > &`]: {
      backgroundColor: `rgb(${theme.color.accent})`,
    },
  },
});
