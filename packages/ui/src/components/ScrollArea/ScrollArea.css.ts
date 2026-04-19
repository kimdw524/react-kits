import { createVar, style } from '@vanilla-extract/css';

export const paddingVar = createVar();

export const scrollArea = style({
  overflowX: 'scroll',

  width: '100%',

  userSelect: 'none',

  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const mask = style({
  maskImage: `linear-gradient(to right,

  transparent 0%,

  black ${paddingVar},

  black calc(100% - ${paddingVar}),

  transparent 100%)`,
});

export const wrapper = style({
  width: 'max-content',

  paddingInline: paddingVar,
});
