'use client';

import { createContext, type Dispatch } from 'react';

interface TabsContext {
  value: number | string | undefined;
  setValue: Dispatch<number | string>;
}

export const TabsContext = createContext<TabsContext | undefined>(undefined);

export const tabsReducer = (
  _: TabsContext['value'],
  value: TabsContext['value'],
) => {
  return value;
};
