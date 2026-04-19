import { style } from '@vanilla-extract/css';

import { paddingVar } from './Card.css';

export const cardContent = style({
  flex: '1 1 auto',

  padding: paddingVar,
});
