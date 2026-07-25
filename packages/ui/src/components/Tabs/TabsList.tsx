'use client';

import { forwardRef, useContext, useLayoutEffect, useRef } from 'react';

import { useCombinedRefs } from '@kimdw-rtk/utils';
import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import { TabsIndicator } from './TabsIndicator';
import * as s from './TabsList.css';
import { TabsContext } from './TabsProvider';

type TabsListProps = UIComponent<'div'>;

const baseWidth = 100;

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, sx: propSx, ...props }, ref) => {
    const tabsContext = useContext(TabsContext);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const prevSelectedRef = useRef<HTMLElement>(undefined);
    const tabsListRef = useCombinedRefs(ref);

    if (tabsContext === undefined) {
      throw new Error('TabsList must be used within a Tabs.');
    }

    useLayoutEffect(() => {
      const indicator = indicatorRef.current;

      if (indicator === null) {
        return;
      }

      if (tabsContext.variant === 'primary') {
        indicator.style.width = `${baseWidth}px`;
      }

      indicator.style.transform = '';
    }, [tabsContext.variant]);

    useLayoutEffect(() => {
      const element = tabsContext.selectedElement,
        indicator = indicatorRef.current,
        tabsList = tabsListRef.current;

      const variant = tabsContext.variant;

      if (!element || !indicator || !tabsList) {
        return;
      }

      if (prevSelectedRef.current === undefined) {
        prevSelectedRef.current = element;
        return;
      }

      const animateIndicator = () => {
        const left = element.offsetLeft,
          width = element.offsetWidth;

        if (indicator.style.transform === '') {
          const prevLeft = prevSelectedRef.current?.offsetLeft ?? 0,
            prevWidth = prevSelectedRef.current?.offsetWidth ?? baseWidth;

          indicator.style.transition = 'none';

          if (variant === 'primary') {
            indicator.style.transform = `translateX(${prevLeft}px) scaleX(${prevWidth / baseWidth})`;
            void indicator.offsetLeft;
            indicator.style.transition = 'transform 0.25s ease';
          } else if (variant === 'secondary') {
            indicator.style.transform = `translateX(${prevLeft}px)`;
            indicator.style.width = `${prevWidth}px`;
            void indicator.offsetLeft;
            indicator.style.transition =
              'width 0.25s ease, transform 0.25s ease';
          }
        }

        if (variant === 'primary') {
          indicator.style.transform = `translateX(${left}px) scaleX(${width / baseWidth})`;
        } else if (variant === 'secondary') {
          indicator.style.transform = `translateX(${left}px)`;
          indicator.style.width = `${width}px`;
        }
      };

      indicator.style.display = 'block';
      animateIndicator();

      const handleTransitionEnd = () => {
        indicator.style.display = 'none';
        tabsList.classList.remove(s.isAnimated);
      };

      tabsList.classList.add(s.isAnimated);
      indicator.addEventListener('transitionend', handleTransitionEnd);

      return () => {
        prevSelectedRef.current = tabsContext.selectedElement;
        indicator.removeEventListener('transitionend', handleTransitionEnd);
      };
    }, [tabsContext.selectedElement, tabsContext.variant, tabsListRef]);

    return (
      <div
        ref={tabsListRef}
        className={clsx(
          className,
          s.container({ variant: tabsContext.variant }),
          sx(propSx),
        )}
        {...props}
      >
        <TabsIndicator
          ref={indicatorRef}
          style={{ display: 'none', width: baseWidth }}
          variant={tabsContext.variant}
        />
        {children}
      </div>
    );
  },
);
TabsList.displayName = 'TabsList';
