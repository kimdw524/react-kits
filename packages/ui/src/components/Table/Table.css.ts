import { createVar } from '@vanilla-extract/css';

import { styleWithComponents } from '#utils';

export const paddingVar = createVar();

export const table = styleWithComponents({
  width: '100%',

  borderSpacing: '0',
  tableLayout: 'fixed',
});

export const striped = styleWithComponents({});
