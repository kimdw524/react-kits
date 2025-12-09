'use client';

import {
  cloneElement,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactElement,
  type RefObject,
} from 'react';

import { useHasAppeared } from '@kimdw-rtk/utils';

import type { AnimationStyle } from '#types';
import { setStyle } from '#utils';

export interface SingleProps {
  children: ReactElement<{
    ref?: RefObject<HTMLElement>;
  }>;
  initial: AnimationStyle;
  animate: AnimationStyle;
  duration: number;
  delay?: number;
  easing?: CSSProperties['animationTimingFunction'];
}

export const Single = ({
  children,
  initial,
  animate,
  duration,
  delay = 0,
  easing = 'ease',
}: SingleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const refIsVisible = useRef<boolean>(false);

  const { hasAppeared } = useHasAppeared(ref);

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    setStyle(element, initial);
    // eslint-disable-next-line
  }, [duration, easing]);

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element || !hasAppeared || refIsVisible.current) {
      return;
    }

    refIsVisible.current = refIsVisible.current || hasAppeared;

    const animation = element.animate(
      [initial as Keyframe, animate as Keyframe],
      {
        duration,
        easing,
        delay,
      },
    );

    animation.onfinish = () => {
      setStyle(element, animate);
      animation.cancel();
    };
    // eslint-disable-next-line
  }, [hasAppeared, delay, duration, easing]);

  return cloneElement(children, { ref });
};
