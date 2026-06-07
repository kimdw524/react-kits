import { useContext, useLayoutEffect, useRef, type KeyboardEvent } from 'react';

import clsx from 'clsx';
import { ChevronDownIcon } from 'lucide-react';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import { SelectContext } from './SelectContext';
import * as s from './SelectTrigger.css';

type SelectTriggerProps = UIComponent<'button', typeof s.selectTrigger>;

const SelectTrigger = ({
  children,
  className,
  variant,
  sx: propSx,
}: SelectTriggerProps) => {
  const selectContext = useContext(SelectContext);
  const containerRef = useRef<HTMLButtonElement>(null);

  if (!selectContext) {
    throw new Error('SelectTrigger must be rendered within a Select.');
  }

  const { state, dispatch } = selectContext;

  const handleClick = () => {
    dispatch({ type: 'TOGGLE' });
  };

  const handleKeydown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (state.isActive) {
      return;
    }

    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      dispatch({ type: 'TOGGLE' });
    }
  };

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container || !state.isActive) {
      return;
    }

    return () => {
      container.focus({ focusVisible: true });
    };
  }, [state.isActive]);

  return (
    <button
      ref={containerRef}
      aria-expanded={state.isActive}
      aria-haspopup="listbox"
      className={clsx(
        s.selectTrigger({ isActive: state.isActive, variant }),
        className,
        sx(propSx),
      )}
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeydown}
    >
      <span className={s.children}>{children}</span>
      <span className={s.icon({ isActive: state.isActive })}>
        <ChevronDownIcon size="1em" strokeWidth="2px" />
      </span>
    </button>
  );
};

export default SelectTrigger;
