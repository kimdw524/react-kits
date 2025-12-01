import { ComponentProps, ElementType } from 'react';

export interface DocsMeta {
  name: string;
  props: {
    name: string;
    isRequired: boolean;
    type: string;
    defaultValue?: string;
    typeRaw?: string;
    description?: string;
  }[];
}

export type DocsProps<T extends ElementType> = Partial<
  Record<keyof ComponentProps<T>, string>
>;
