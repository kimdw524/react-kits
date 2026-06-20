import { breakpoint } from '#tokens';

export const conditions = {
  mobile: {},
  desktop: { '@media': `screen and (min-width: ${breakpoint.md})` },
};
