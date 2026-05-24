'use client';

import { createContext, useContext } from 'react';

export interface RadioGroupContextValue {
  defaultValue?: string;
  disabled?: boolean;
  name: string;
  onChange?: (value: string) => void;
  value?: string;
}

export const RadioGroupContext = createContext<
  RadioGroupContextValue | undefined
>(undefined);

export const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);

  if (context === undefined) {
    throw new Error('RadioGroupItem must be used within a RadioGroup.');
  }

  return context;
};
