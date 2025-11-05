'use client';

import {
  forwardRef,
  useEffect,
  useReducer,
  useRef,
  type ComponentProps,
  type CSSProperties,
  type RefObject,
} from 'react';

import { useCombinedRefs } from '@kimdw-rtk/utils';
import clsx from 'clsx';

import { sx } from '@/styles';
import type { UIComponent } from '@/types';

import * as s from './Select.css';
import { SelectContext, selectReducer } from './SelectContext';
import SelectOptionList from './SelectOptionList';
import SelectTrigger from './SelectTrigger';

interface SelectProps
  extends Omit<UIComponent<'div', typeof s.select>, 'ref' | 'onChange'> {
  ref?: RefObject<{ value?: string } | null>;
  name?: string;
  width?: CSSProperties['width'];
  defaultValue?: string;
  variant?: ComponentProps<typeof SelectTrigger>['variant'];
  onChange?: (value: string | undefined) => void;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      children,
      className,
      style,
      name,
      defaultValue,
      width = '100%',
      size = 'md',
      sx: propSx,
      variant = 'outlined',
      onChange,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const targetRef = useCombinedRefs(ref, containerRef);
    const [state, dispatch] = useReducer(selectReducer, {
      isActive: false,
      containerRef,
      defaultValue,
      items: new Map(),
    });

    useEffect(() => {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const handleOutsideClick = (e: MouseEvent) => {
        if (container.contains(e.target as Node) || !state.isActive) {
          return;
        }

        dispatch({ type: 'TOGGLE' });
      };

      window.addEventListener('mousedown', handleOutsideClick);

      return () => {
        window.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [state.isActive, dispatch]);

    useEffect(() => {
      if (!onChange || !state.items.size) {
        return;
      }

      onChange(state.selected);
      //eslint-disable-next-line
    }, [state.selected]);

    return (
      <SelectContext.Provider value={{ state, dispatch }}>
        <div
          ref={targetRef}
          style={{ ...style, width }}
          className={clsx(s.select({ size }), className, sx(propSx))}
          {...props}
        >
          <SelectTrigger variant={variant}>
            {state.selected !== null && state.items.get(state.selected || '')}
          </SelectTrigger>
          <SelectOptionList>{children}</SelectOptionList>
          <input type="hidden" name={name} value={state.selected || ''} />
        </div>
      </SelectContext.Provider>
    );
  },
);
Select.displayName = 'Select';

export { s as selectCss };
