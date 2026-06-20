import { styleWithComponents } from '#utils';

export const scrollArea = styleWithComponents({
  overflowX: 'scroll',

  width: '100%',

  userSelect: 'none',

  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const wrapper = styleWithComponents({
  width: 'max-content',
});
