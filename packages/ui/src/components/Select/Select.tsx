'use client';

import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';

import { useCombinedRefs } from '@kimdw-rtk/utils';
import clsx from 'clsx';

import { sprinkles, sx, type ColorProperties } from '#styles';
import type { typography } from '#tokens';
import type { UIComponent } from '#types';

import * as s from './Select.css';
import { SelectContext, selectReducer } from './SelectContext';
import SelectOptionList from './SelectOptionList';
import SelectTrigger from './SelectTrigger';

interface SelectProps extends Omit<UIComponent<'div'>, 'ref' | 'onChange'> {
  ref?: RefObject<{ value?: string } | null>;
  size?: keyof typeof typography.size;
  color?: ColorProperties['backgroundColor'];
  name?: string;
  width?: CSSProperties['width'];
  defaultValue?: string;
  value?: string;
  variant?: ComponentProps<typeof SelectTrigger>['variant'];
  onChange?: (value: string | undefined) => void;
}

const getSelectItems = (children: ReactNode) => {
  const items = new Map<string, ReactNode>();
  for (const child of Children.toArray(children)) {
    if (!isValidElement<{ value?: string; children?: ReactNode }>(child)) {
      continue;
    }

    if (child.props.value !== undefined) {
      items.set(child.props.value, child.props.children);
    }
  }

  return items;
};

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      children,
      className,
      color,
      style,
      name,
      defaultValue,
      value,
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
    const isControlled = value !== undefined;
    const [state, dispatch] = useReducer(selectReducer, {
      isActive: false,
      selected: isControlled ? value : defaultValue,
      containerRef,
      size,
      items: new Map(),
      itemValues: [],
    });
    const selected = isControlled ? value : state.selected;
    const items = useMemo(() => getSelectItems(children), [children]);
    const itemValues = useMemo(() => Array.from(items.keys()), [items]);
    const contextState = useMemo(
      () => ({ ...state, items, itemValues, selected, size }),
      [itemValues, items, selected, size, state],
    );
    const selectedLabel = items.get(selected || '');

    const selectOption = useCallback(
      (nextValue: string) => {
        dispatch({
          type: 'SELECT',
          payload: { value: nextValue, shouldUpdateSelected: !isControlled },
        });

        if (selected === nextValue) {
          return;
        }

        onChange?.(nextValue);
      },
      [isControlled, onChange, selected],
    );
    const contextValue = useMemo(
      () => ({ state: contextState, dispatch, selectOption }),
      [contextState, selectOption],
    );

    return (
      <SelectContext.Provider value={contextValue}>
        <div
          ref={targetRef}
          className={clsx(
            s.select,
            sprinkles({ fontSize: size }),
            className,
            sx(propSx),
          )}
          style={{ ...style, width }}
          {...props}
        >
          <SelectTrigger color={color} variant={variant}>
            {selectedLabel}
          </SelectTrigger>
          <SelectOptionList>{children}</SelectOptionList>
          <input name={name} type="hidden" value={selected || ''} />
        </div>
      </SelectContext.Provider>
    );
  },
);
Select.displayName = 'Select';

export { s as selectCss };
