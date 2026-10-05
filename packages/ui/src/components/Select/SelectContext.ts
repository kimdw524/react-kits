import { createContext, type Dispatch, type ReactNode } from 'react';

import type { typography } from '#tokens';

type SelectState = {
  isActive: boolean;
  selected?: string;
  focused?: string;
  size: keyof typeof typography.size;
  items: Map<string, ReactNode>;
  itemValues: string[];
  containerRef: React.RefObject<HTMLDivElement | null>;
};

type SelectAction =
  | {
      type: 'SELECT';
      payload: { value: string; shouldUpdateSelected?: boolean };
    }
  | { type: 'FOCUS'; payload: { value?: string } }
  | { type: 'UP'; payload: { values: string[]; selected?: string } }
  | { type: 'DOWN'; payload: { values: string[]; selected?: string } }
  | { type: 'HOME'; payload: { values: string[] } }
  | { type: 'END'; payload: { values: string[] } }
  | { type: 'TOGGLE'; payload: { selected?: string } };

export const SelectContext = createContext<
  | {
      state: SelectState;
      dispatch: Dispatch<SelectAction>;
      selectOption: (value: string) => void;
    }
  | undefined
>(undefined);

export const selectReducer = (
  state: SelectState,
  action: SelectAction,
): SelectState => {
  switch (action.type) {
    case 'SELECT':
      return {
        ...state,
        isActive: false,
        selected:
          action.payload.shouldUpdateSelected === false
            ? state.selected
            : action.payload.value,
      };
    case 'FOCUS':
      return {
        ...state,
        focused: action.payload.value,
      };
    case 'UP': {
      const { values, selected } = action.payload;
      const focused = state.focused ?? selected;
      const focusedIndex = values.indexOf(focused ?? '');

      if (focused === undefined || focusedIndex === -1) {
        return { ...state, focused: values.at(-1) };
      }

      if (focusedIndex <= 0) {
        return state;
      }

      return { ...state, focused: values[focusedIndex - 1] };
    }
    case 'DOWN': {
      const { values, selected } = action.payload;
      const focused = state.focused ?? selected;
      const focusedIndex = values.indexOf(focused ?? '');

      if (focused === undefined || focusedIndex === -1) {
        return { ...state, focused: values[0] };
      }

      if (focusedIndex >= values.length - 1) {
        return state;
      }

      return { ...state, focused: values[focusedIndex + 1] };
    }
    case 'HOME': {
      const [firstValue] = action.payload.values;

      if (firstValue === undefined) {
        return state;
      }

      return { ...state, focused: firstValue };
    }
    case 'END': {
      const lastValue = action.payload.values.at(-1);

      if (lastValue === undefined) {
        return state;
      }

      return { ...state, focused: lastValue };
    }
    case 'TOGGLE':
      return {
        ...state,
        isActive: !state.isActive,
        focused: state.isActive ? undefined : action.payload.selected,
      };
  }
};
