import { width } from './width';

export const breakpoint = {
  ...width,
  desktop: width.md,
} as const;
