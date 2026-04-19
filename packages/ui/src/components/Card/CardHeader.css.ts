import { style } from '@vanilla-extract/css';

import { paddingVar } from './Card.css';

export const cardHeader = style({
  padding: paddingVar,
  paddingBottom: '0',
});
