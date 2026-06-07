import { createContext, type Dispatch, type ReactNode } from 'react';

type SelectState = {
  isActive: boolean;
  selected?: string;
  focused?: string;
  defaultValue?: string;
  items: Map<string, ReactNode>;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

type SelectAction =
  | { type: 'ADD'; payload: { value: string; children: ReactNode } }
  | { type: 'REMOVE'; payload: { value: string } }
  | { type: 'SELECT'; payload: { value: string } }
  | { type: 'FOCUS'; payload: { value?: string } }
  | { type: 'UP' }
  | { type: 'DOWN' }
  | { type: 'HOME' }
  | { type: 'END' }
  | { type: 'TOGGLE' };

export const SelectContext = createContext<
  { state: SelectState; dispatch: Dispatch<SelectAction> } | undefined
>(undefined);

export const selectReducer = (
  state: SelectState,
  action: SelectAction,
): SelectState => {
  switch (action.type) {
    case 'ADD': {
      // 현재 selected가 없고, defaultValue === payload.value일 경우 select함.
      if (
        state.selected === undefined &&
        state.defaultValue === action.payload.value
      ) {
        return {
          ...state,
          selected: action.payload.value,
          items: new Map(state.items).set(
            action.payload.value,
            action.payload.children,
          ),
        };
      }
      return {
        ...state,
        items: new Map(state.items).set(
          action.payload.value,
          action.payload.children,
        ),
      };
    }
    case 'REMOVE': {
      const newMap = new Map(state.items);
      newMap.delete(action.payload.value);
      return { ...state, items: newMap };
    }
    case 'SELECT':
      return {
        ...state,
        isActive: false,
        selected: action.payload.value,
      };
    case 'FOCUS':
      return {
        ...state,
        focused: action.payload.value,
      };
    case 'UP': {
      const values = Array.from(state.items.keys());
      const focused = state.focused ?? state.selected;
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
      const values = Array.from(state.items.keys());
      const focused = state.focused ?? state.selected;
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
      const [firstValue] = state.items.keys();

      if (firstValue === undefined) {
        return state;
      }

      return { ...state, focused: firstValue };
    }
    case 'END': {
      const values = Array.from(state.items.keys());
      const lastValue = values[values.length - 1];

      if (lastValue === undefined) {
        return state;
      }

      return { ...state, focused: lastValue };
    }
    case 'TOGGLE':
      return {
        ...state,
        isActive: !state.isActive,
        focused: state.isActive ? undefined : state.selected,
      };
  }
};
