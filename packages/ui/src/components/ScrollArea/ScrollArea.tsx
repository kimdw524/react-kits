'use client';

import { forwardRef, useEffect, useRef } from 'react';

import { useCombinedRefs } from '@kimdw-rtk/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';

import { useMouseScroll } from '#hooks/useMouseScroll';
import { sx } from '#styles';
import { spacing } from '#tokens';
import type { UIComponent } from '#types';

import * as s from './ScrollArea.css';

interface ScrollAreaProps extends UIComponent<'div'> {
  innerPadding?: keyof typeof spacing;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    { children, className, innerPadding = 'lg', sx: propSx, style, ...props },
    ref,
  ) => {
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const targetRef = useCombinedRefs(ref, scrollAreaRef);
    useMouseScroll(scrollAreaRef);

    useEffect(() => {
      const element = scrollAreaRef.current;

      if (element === null) {
        return;
      }

      const handleWheel = (e: WheelEvent) => {
        if (
          element.scrollLeft + e.deltaY <= 0 ||
          Math.round(element.scrollLeft + e.deltaY + element.clientWidth) >=
            element.scrollWidth
        ) {
          return;
        }

        e.preventDefault();
      };

      element.addEventListener('wheel', handleWheel);

      return () => {
        element.removeEventListener('wheel', handleWheel);
      };
    }, []);

    return (
      <div
        ref={targetRef}
        className={clsx(s.scrollArea, className, sx(propSx), s.mask)}
        {...props}
        style={{
          ...style,
          ...assignInlineVars({ [s.paddingVar]: spacing[innerPadding] }),
        }}
      >
        <div className={s.wrapper}>{children}</div>
      </div>
    );
  },
);
ScrollArea.displayName = 'ScrollArea';

export { s as scrollAreaCss };
