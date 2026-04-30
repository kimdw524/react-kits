import { theme } from '#themes';
import { styleWithComponents } from '#utils';

import * as header from './DialogHeader.css';

export const container = styleWithComponents({
  wordBreak: 'break-all',

  selectors: {
    [`${header.container} + &`]: {
      color: `rgb(${theme.color['muted-foreground']})`,
    },
  },
});
