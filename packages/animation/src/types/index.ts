import type { CSSProperties, ReactElement, RefObject } from 'react';

export type AnimationStyle = string | CSSProperties;

export type AnimationElement = ReactElement<{
  ref?: RefObject<HTMLElement>;
  className?: string;
  style?: CSSProperties;
}>;
