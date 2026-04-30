import { createVar } from '@vanilla-extract/css';

import { styleWithComponents } from '#utils';

export const paddingVar = createVar();

export const scrollArea = styleWithComponents({
  overflowX: 'scroll',

  width: '100%',

  userSelect: 'none',

  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const mask = styleWithComponents({
  maskImage: `linear-gradient(to right,

  transparent 0%,

  black ${paddingVar},

  black calc(100% - ${paddingVar}),

  transparent 100%)`,
});

export const wrapper = styleWithComponents({
  width: 'max-content',

  paddingInline: paddingVar,
});
