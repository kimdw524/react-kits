'use client';

import { createContext, type ComponentProps } from 'react';

import type { Tabs } from '#components';

export interface TabsState {
  value: number | string | undefined;
  selectedElement: HTMLElement | undefined;
  variant: NonNullable<ComponentProps<typeof Tabs>['variant']>;
}

type TabsAction = {
  type: 'SELECT_TAB';
  value: TabsState['value'];
  selectedElement: TabsState['selectedElement'];
  variant: TabsState['variant'];
};

interface TabsContext extends TabsState {
  onChange?: (value: number | string) => void;
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
