'use client';

import { createContext } from 'react';

export interface TabsState {
  value: number | string | undefined;
  selectedElement: HTMLElement | undefined;
}

type TabsAction = {
  type: 'SELECT_TAB';
  value: TabsState['value'];
  selectedElement: TabsState['selectedElement'];
};

interface TabsContext extends TabsState {
  selectTab: (
    value: TabsState['value'],
    selectedElement: TabsState['selectedElement'],
  ) => void;
}

export const TabsContext = createContext<TabsContext | undefined>(undefined);

export const tabsReducer = (
  state: TabsState,
  action: TabsAction,
): TabsState => {
  switch (action.type) {
    case 'SELECT_TAB':
      return {
        ...state,
        value: action.value,
        selectedElement: action.selectedElement,
      };
    default:
      return state;
  }
};
