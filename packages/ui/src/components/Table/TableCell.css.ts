import { styleWithLayer } from '#styleUtils';
import { theme } from '#themes';

import { paddingVar, striped } from './Table.css';
import { interactive } from './TableRow.css';

export const tableCell = styleWithLayer({
  paddingBlock: paddingVar,
  paddingInline: `calc(${paddingVar} / 2)`,

  transition: 'background-color 0.1s ease, color 0.1s ease',

  selectors: {
    [`${interactive} > &`]: {
      cursor: 'pointer',
    },

    'tr > &:first-child': {
      borderTopLeftRadius: theme.borderRadius,
      borderBottomLeftRadius: theme.borderRadius,
      paddingLeft: paddingVar,
    },

    'tr > &:last-child': {
      borderTopRightRadius: theme.borderRadius,
      borderBottomRightRadius: theme.borderRadius,
      paddingRight: paddingVar,
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
