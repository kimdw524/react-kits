export type * from './utility';

export type ParamValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[];

export type SetParamsAction<T> = Partial<T> | ((params: T) => Partial<T>);

export type ParamsDispatch<T> = (
  value: T,
  onValidationFailed?: (error: unknown) => void,
) => void;

export interface Serializer {
  serialize: (value: ParamValue) => string[];
  deserialize: (search: string) => Record<string, string | string[]>;
}
