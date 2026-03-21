import type { ParamValue } from './types';
import { objectToURLSearchParams } from './utils';

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

  /**
   * Converts schema-typed params into a URL query string.
   */
  const toString = (params: T): string => {
    const nextState = skipValidation
      ? params
      : validate(
          params as {
            [K in keyof T]?: T[K] | string | string[];
          },
        );

    return objectToURLSearchParams(nextState).toString();
  };

  return { defaultValue, validate, skipValidation, toString };
};

export type SearchParamsSchema<T extends Record<string, ParamValue>> =
  ReturnType<typeof createSearchParamsSchema<T>>;
