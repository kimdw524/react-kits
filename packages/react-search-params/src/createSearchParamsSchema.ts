import type { ParamValue } from './types';

/**
 * Creates a search params schema definition.
 *
 * @param options Schema options.
 */
export const createSearchParamsSchema = <
  T extends Record<string, ParamValue>,
>(options: {
  /** Initial value for the schema. */
  initialValue: T;
  /** Define this only when the schema's initial value differs from the default value. */
  defaultValue?: NoInfer<T>;
  /** Function that validates the schema value. It must throw on failure. */
  validate: (params: {
    [K in keyof T]: T[K] | string | string[];
  }) => NoInfer<T>;
  /** Serializes a param value for URL usage. */
}) => {
  const { initialValue, defaultValue, validate } = options;

  return { initialValue, defaultValue: defaultValue ?? initialValue, validate };
};

export type SearchParamsSchema<T extends Record<string, ParamValue>> =
  ReturnType<typeof createSearchParamsSchema<T>>;
