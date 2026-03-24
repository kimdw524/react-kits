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
  /** If a value type is an array, you must explicitly provide the keys of those params as an array. */
  arrayParams?: {
    [K in keyof T]: T[K] extends unknown[] ? K : never;
  }[keyof T][];
  /** Function that validates the schema value. It must throw on failure. */
  validate: (params: {
    [K in keyof T]?: T[K] extends unknown[] ? T[K] | string[] : T[K] | string;
  }) => NoInfer<T>;
  /**
   * Skips runtime validation for developer input because TypeScript compile-time type checking is sufficient.
   */
  skipValidation?: boolean;
}) => {
  const {
    defaultValue,
    skipValidation = false,
    arrayParams = [],
    validate,
  } = options;

  /**
   * Converts schema-typed params into a URL query string.
   */
  const toString = (params: T): string => {
    const nextState = skipValidation
      ? params
      : validate(
          params as {
            [K in keyof T]?: T[K];
          },
        );

    return objectToURLSearchParams(nextState).toString();
  };

  return {
    defaultValue,
    skipValidation,
    arrayParams: new Set(arrayParams as string[]),
    validate,
    toString,
  };
};

export type SearchParamsSchema<T extends Record<string, ParamValue>> =
  ReturnType<typeof createSearchParamsSchema<T>>;
