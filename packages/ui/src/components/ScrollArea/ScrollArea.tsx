'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';

import { useCombinedRefs } from '@kimdw-rtk/utils';
import clsx from 'clsx';

import { useMouseScroll } from '@/hooks/useMouseScroll';
import { sx } from '@/styles';
import type { UIComponent } from '@/types';

import * as s from './ScrollArea.css';

type ScrollAreaProps = UIComponent<'div'>;

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ children, className, sx: propSx, ...props }, ref) => {
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const targetRef = useCombinedRefs(ref, scrollAreaRef);
    const [hasLeftSpace, setHasLeftSpace] = useState<boolean>(false);
    const [hasRightSpace, setHasRightSpace] = useState<boolean>(true);
    useMouseScroll(scrollAreaRef);

    useEffect(() => {
      const element = scrollAreaRef.current;

      if (element === null) {
        return;
      }

      const handleScroll = () => {
        setHasLeftSpace(element.scrollLeft !== 0);
        setHasRightSpace(
          Math.round(element.scrollLeft + element.clientWidth) <
            element.scrollWidth,
        );
      };

      handleScroll();

      element.addEventListener('scroll', handleScroll);

      return () => {
        element.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return (
      <div
        ref={targetRef}
        className={clsx(
          s.scrollArea,
          className,
          sx(propSx),
          hasLeftSpace && hasRightSpace && s.maskBoth,
          hasLeftSpace && s.maskLeft,
          hasRightSpace && s.maskRight,
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
