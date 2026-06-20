'use client';

import { forwardRef, useEffect, useRef } from 'react';

import { useCombinedRefs } from '@kimdw-rtk/utils';
import clsx from 'clsx';

import { useMouseScroll } from '#hooks/useMouseScroll';
import { sprinkles, sx, type VarsSprinklesProps } from '#styles';
import type { UIComponent } from '#types';

import { varsSprinkles } from '../../styles/varsSprinkles';
import * as s from './ScrollArea.css';

interface ScrollAreaProps extends UIComponent<'div', typeof s.scrollArea> {
  innerPadding?: VarsSprinklesProps['spacing'];
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      children,
      className,
      innerPadding,
      showScrollbar = true,
      sx: propSx,
      ...props
    },
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
        className={clsx(
          s.scrollArea({ showScrollbar }),
          s.mask,
          className,
          sx(propSx),
          varsSprinkles({ spacing: innerPadding }),
        )}
        {...props}
      >
        <div className={s.wrapper}>{children}</div>
      </div>
    );
  },
);

ScrollArea.displayName = 'ScrollArea';

export { s as scrollAreaCss };
