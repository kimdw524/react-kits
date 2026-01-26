import { Children, type ComponentProps, type ReactElement } from 'react';

import type { AnimationElement } from '#types';

import { Single } from '../Single';

export interface MultiProps
  extends Omit<ComponentProps<typeof Single>, 'children'> {
  children: AnimationElement | AnimationElement[];
  delayGap?: number;
  durationGap?: number;
}

export const Multi = ({
  children,
  delay = 0,
  delayGap = 0,
  duration,
  durationGap = 0,
  ...rest
}: MultiProps) => {
  const items = Children.toArray(children) as ReactElement[];

  return (
    <>
      {items.map((item, index) => (
        <Single
          key={item.key || index}
          delay={delay + delayGap * index}
          duration={duration + durationGap * index}
          {...rest}
        >
          {item}
        </Single>
      ))}
    </>
  );
};
