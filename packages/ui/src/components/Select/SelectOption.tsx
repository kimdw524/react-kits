'use client';

import { forwardRef, useContext, useEffect, type ReactNode } from 'react';

import { useCombinedRefs } from '@kimdw-rtk/utils';

import { SelectContext } from './SelectContext';
import * as s from './SelectOption.css';

export interface SelectOptionProps {
  children: ReactNode;
  value: string;
}

export const SelectOption = forwardRef<HTMLButtonElement, SelectOptionProps>(
  ({ children, value }, ref) => {
    const containerRef = useCombinedRefs<HTMLButtonElement>(ref);
    const selectContext = useContext(SelectContext);

    if (!selectContext) {
      throw new Error('SelectOption must be rendered within a Select.');
    }

    const { state, dispatch } = selectContext;

    const handleMouseEnter = () => {
      dispatch({ type: 'FOCUS', payload: { value } });
    };

    const handleClick = () => {
      dispatch({ type: 'SELECT', payload: { value } });
    };

    useEffect(() => {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      if (state.focused === value) {
        container.focus({ focusVisible: true });
      }

      return () => {
        if (state.focused === value) {
          container.blur();
        }
      };
    }, [state.focused, value, containerRef]);

    useEffect(() => {
      dispatch({ type: 'ADD', payload: { value, children } });

      return () => {
        dispatch({ type: 'REMOVE', payload: { value } });
      };
      // eslint-disable-next-line
    }, [dispatch, value]);

    return (
      <button
        ref={containerRef}
        aria-selected={state.selected === value}
        className={s.selectOption}
        role="option"
        tabIndex={0}
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      >
        {children}
      </button>
    );
  },
);

SelectOption.displayName = 'SelectOption';
