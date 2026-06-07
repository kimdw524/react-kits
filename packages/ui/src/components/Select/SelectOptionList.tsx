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
import { setListPosition } from './SelectOptionList.util';

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

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          dispatch({ type: 'DOWN' });
          break;
        case 'ArrowUp':
          event.preventDefault();
          dispatch({ type: 'UP' });
          break;
        case 'Home':
          event.preventDefault();
          dispatch({ type: 'HOME' });
          break;
        case 'End':
          event.preventDefault();
          dispatch({ type: 'END' });
          break;
        case 'Escape':
          event.preventDefault();
          dispatch({ type: 'TOGGLE' });
          break;
        default:
          return;
      }
    };

    window.addEventListener('scroll', handleClose);
    window.addEventListener('resize', handleClose);
    window.addEventListener('blur', handleClose);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleClose);
      window.removeEventListener('resize', handleClose);
      window.removeEventListener('blur', handleClose);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.isActive, dispatch]);

  useLayoutEffect(() => {
    const container = containerRef.current,
      parent = state.containerRef.current;
    if (!state.isActive || !container || !parent) {
      return;
    }

    setListPosition(container, parent);
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
            role="listbox"
            onMouseDown={(e) => e.stopPropagation()}
            onMouseLeave={() => {
              dispatch({ type: 'FOCUS', payload: { value: undefined } });
            }}
          >
            {children}
          </div>
        </div>
      )}
    </Portal>
  );
};

export default SelectOptionList;
