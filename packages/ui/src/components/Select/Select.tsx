'use client';

import {
  Children,
  forwardRef,
  isValidElement,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
  type ComponentProps,
  type CSSProperties,
  type RefObject,
} from 'react';

import { useCombinedRefs } from '@kimdw-rtk/utils';
import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

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

const getDefaultSelectedLabel = (
  children: ReactNode,
  value: string | undefined,
) => {
  if (!value) {
    return undefined;
  }

  for (const child of Children.toArray(children)) {
    if (!isValidElement<{ value?: string; children?: ReactNode }>(child)) {
      continue;
    }

    if (child.props.value === value) {
      return child.props.children;
    }
  }

  return undefined;
};

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
      selected: defaultValue,
      containerRef,
      defaultValue,
      items: new Map(),
    });
    const selected = state.selected ?? defaultValue;
    const selectedLabel =
      state.items.get(selected || '') ??
      getDefaultSelectedLabel(children, selected);

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
          className={clsx(s.select({ size }), className, sx(propSx))}
          style={{ ...style, width }}
          {...props}
        >
          <SelectTrigger variant={variant}>{selectedLabel}</SelectTrigger>
          <SelectOptionList>{children}</SelectOptionList>
          <input name={name} type="hidden" value={selected || ''} />
        </div>
      </SelectContext.Provider>
    );
  },
);
Select.displayName = 'Select';

export { s as selectCss };
