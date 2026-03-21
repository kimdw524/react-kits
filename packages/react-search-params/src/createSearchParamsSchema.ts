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
  defaultValue: T;
  /** Function that validates the schema value. It must throw on failure. */
  validate: (params: {
    [K in keyof T]?: T[K] | string | string[];
  }) => NoInfer<T>;
  /**
   * Skips runtime validation for developer input because TypeScript compile-time type checking is sufficient.
   */
  skipValidation?: boolean;
}) => {
  const { defaultValue, validate, skipValidation = false } = options;

  return { defaultValue, validate, skipValidation };
};

export type SearchParamsSchema<T extends Record<string, ParamValue>> =
  ReturnType<typeof createSearchParamsSchema<T>>;
