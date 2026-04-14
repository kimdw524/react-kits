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
    const tabsListRef = useCombinedRefs(ref);

    if (tabsContext === undefined) {
      throw new Error('TabsList must be used within a Tabs.');
    }

    useLayoutEffect(() => {
      const element = tabsContext.selectedElement,
        indicator = indicatorRef.current,
        tabsList = tabsListRef.current;

      if (!element || !indicator || !tabsList) {
        return;
      }

      const animatedIndicator = () => {
        const left = element.offsetLeft,
          width = element.offsetWidth;
        indicator.style.transformOrigin = '0';
        indicator.style.transform = `translateX(${left}px) scaleX(${width / baseWidth})`;
      };

      indicator.style.display = 'block';
      animatedIndicator();

      const handleTransitionEnd = () => {
        indicator.style.display = 'none';
        tabsList.classList.remove(s.isAnimated);
      };

      tabsList.classList.add(s.isAnimated);
      indicator.addEventListener('transitionend', handleTransitionEnd);

      return () => {
        animatedIndicator();
        indicator.removeEventListener('transitionend', handleTransitionEnd);
      };
    }, [tabsContext.selectedElement, tabsListRef]);

    return (
      <div
        ref={tabsListRef}
        className={clsx(className, s.container, sx(propSx))}
        {...props}
      >
        {children}
        <TabsIndicator
          ref={indicatorRef}
          style={{ display: 'none', width: `${baseWidth}px` }}
        />
      </div>
    );
  },
);
TabsList.displayName = 'TabsList';
