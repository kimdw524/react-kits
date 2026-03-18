export type * from './utility';

export type ParamValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[];

export type SetParamsAction<T> = Partial<T> | ((params: T) => Partial<T>);

export type SetParamsOptions = {
  onValidationFailed?: (error: unknown) => void;
  history?: 'pushState' | 'replaceState';
};

export type ParamsDispatch<T> = (value: T, options?: SetParamsOptions) => void;

export interface Serializer {
  serialize: (value: ParamValue) => string[];
  deserialize: (
    searchParams: URLSearchParams,
  ) => Record<string, string | string[]>;
}
