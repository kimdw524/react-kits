'use client';

import { forwardRef, useReducer } from 'react';

import clsx from 'clsx';

import { sprinkles, sx } from '#styles';
import type { typography } from '#tokens';
import type { UIComponent } from '#types';

import * as s from './Accordion.css';
import { AccordionContext, accordionReducer } from './AccordionContext';

interface AccordionProps extends UIComponent<'div', typeof s.accordion> {
  isExpanded?: boolean;
  size?: keyof typeof typography.size;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      className,
      size = 'md',
      isPadding = true,
      isExpanded: initIsExpaned = false,
      sx: propSx,
      ...props
    },
    ref,
  ) => {
    const [isExpanded, dispatch] = useReducer(accordionReducer, initIsExpaned);

    return (
      <div
        ref={ref}
        className={clsx(
          s.accordion({ isPadding }),
          sprinkles({ fontSize: size }),
          className,
          sx(propSx),
        )}
        {...props}
      >
        <AccordionContext.Provider value={{ isExpanded, dispatch }}>
          {children}
        </AccordionContext.Provider>
      </div>
    );
  },
);
Accordion.displayName = 'Accordion';
