import { useLayoutEffect, useRef, type CSSProperties } from 'react';

import { useHasAppeared } from '@kimdw-rtk/utils';

import { setStyle } from '#utils';

export interface TextProps {
  children: string;
  unit?: 'word' | 'letter';
  initial: CSSProperties;
  animate: CSSProperties;
  duration: number;
  delay?: number;
  easing?: CSSProperties['animationTimingFunction'];
}

export const Text = ({
  children,
  unit = 'letter',
  initial,
  animate,
  duration,
  delay = 0,
  easing = 'ease',
}: TextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const refs = useRef<HTMLSpanElement[]>([]);
  const refIsVisible = useRef<boolean>(false);

  const { hasAppeared } = useHasAppeared(containerRef);

  useLayoutEffect(() => {
    refs.current.forEach((element) => {
      if (!element) {
        return;
      }

      element.style.display = 'inline-block';
      setStyle(element, initial);
    });
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    if (!hasAppeared || refIsVisible.current) {
      return;
    }

    refIsVisible.current = refIsVisible.current || hasAppeared;

    const count = refs.current.length - 1;

    refs.current.forEach((element, index) => {
      if (!element) {
        return;
      }

      const animation = element.animate(
        [initial as Keyframe, animate as Keyframe],
        {
          duration,
          easing,
          delay: delay + (index / count) * duration,
        },
      );

      animation.onfinish = () => {
        setStyle(element, animate);
        animation.cancel();
      };
    });
    // eslint-disable-next-line
  }, [hasAppeared, delay, duration, easing]);

  return (
    <span ref={containerRef}>
      {children.split(unit === 'letter' ? '' : ' ').map((char, index) => (
        <span
          key={index}
          ref={(element) => {
            if (element) {
              refs.current[index] = element;
            }
          }}
        >
          {unit === 'letter'
            ? char === ' '
              ? '\u00A0'
              : char
            : index === 0
              ? char
              : `\u00A0${char}`}
        </span>
      ))}
    </span>
  );
};
