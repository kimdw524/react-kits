import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from 'react';

import clsx from 'clsx';

import { Portal } from '#components';
import { sprinkles } from '#styles';

import { SelectContext } from './SelectContext';
import * as s from './SelectOptionList.css';

interface SelectOptionListProps {
  children: ReactNode;
}

const SelectOptionList = ({ children }: SelectOptionListProps) => {
  const selectContext = useContext(SelectContext);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!selectContext) {
    throw new Error('SelectOption must be rendered within a Select.');
  }

  const { state, dispatch } = selectContext;

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const handleClose = () => {
      if (state.isActive) {
        dispatch({ type: 'TOGGLE' });
      }
    };

    window.addEventListener('scroll', handleClose);
    window.addEventListener('resize', handleClose);
    window.addEventListener('blur', handleClose);

    return () => {
      window.removeEventListener('scroll', handleClose);
      window.removeEventListener('resize', handleClose);
      window.removeEventListener('blur', handleClose);
    };
  }, [state.isActive, dispatch]);

  useLayoutEffect(() => {
    const container = containerRef.current,
      parent = state.containerRef.current;
    if (!state.isActive || !container || !parent) {
      return;
    }

    const parentRect = parent.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(container);
    const margin =
      (Number.parseFloat(computedStyle.marginTop) || 0) +
      (Number.parseFloat(computedStyle.marginBottom) || 0);
    const viewportHeight = document.documentElement.clientHeight;
    const spaceAbove = parentRect.top;
    const spaceBelow = viewportHeight - parentRect.bottom;
    const nextIsBelow =
      containerRect.height + margin <= spaceBelow || spaceBelow >= spaceAbove;
    const availableHeight = (nextIsBelow ? spaceBelow : spaceAbove) - margin;

    container.style.top = nextIsBelow ? `${parentRect.bottom}px` : '';
    container.style.bottom = nextIsBelow
      ? ''
      : `${viewportHeight - parentRect.top}px`;
    container.style.left = `${parentRect.left}px`;
    container.style.width = `${parentRect.width}px`;
    container.style.maxHeight = `${Math.max(availableHeight, 0)}px`;
    container.style.transformOrigin = nextIsBelow ? 'top' : 'bottom';
  }, [state.isActive, state.containerRef]);

  return (
    <Portal>
      {state.isActive && (
        <div
          className={s.block}
          onMouseDown={() => dispatch({ type: 'TOGGLE' })}
        >
          <div
            ref={containerRef}
            className={clsx(
              s.container({ isVisible: state.isActive }),
              sprinkles({ boxShadow: 'accent-sm' }),
            )}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </Portal>
  );
};

export default SelectOptionList;
