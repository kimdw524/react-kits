import { createContext, type Dispatch } from 'react';

export const AccordionContext = createContext<
  { isExpanded: boolean; dispatch: Dispatch<boolean> } | undefined
>(undefined);

export const accordionReducer = (_: boolean, action: boolean) => {
  return action;
};
