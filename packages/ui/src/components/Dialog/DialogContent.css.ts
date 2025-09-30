import { styleWithLayer } from '#styleUtils';
import { theme } from '#themes';

import * as header from './DialogHeader.css';

export const container = styleWithLayer({
  padding: '0 1.5rem 1.5rem 1.5rem',

  wordBreak: 'break-all',

  selectors: {
    [`${header.container} + &`]: {
      color: `rgb(${theme.color['muted-foreground']})`,
    },
  },
});
