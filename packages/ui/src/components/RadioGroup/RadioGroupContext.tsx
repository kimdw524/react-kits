'use client';

import type { ComponentProps } from 'react';
import { createContext, useContext } from 'react';

import type { LabelInteraction } from '../LabelInteraction';

export type RadioGroupInteraction =
  | ComponentProps<typeof LabelInteraction>['size']
  | 'none';

export interface RadioGroupContextValue {
  defaultValue?: string;
  disabled?: boolean;
  interaction?: RadioGroupInteraction;
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
