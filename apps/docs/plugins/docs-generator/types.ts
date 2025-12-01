import { ComponentProps, ComponentType } from 'react';

export interface DocsMeta {
  name: string;
  props: {
    name: string;
    isRequired: boolean;
    type: string;
    typeRaw?: string;
    description?: string;
  }[];
}

export type DocsProps<T extends ComponentType> = Partial<
  Record<keyof ComponentProps<T>, string>
>;
