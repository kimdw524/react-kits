import type { ParamValue } from './types';
import { objectToURLSearchParams } from './utils';

interface BaseOption<T> {
  /** Initial value for the schema. */
  defaultValue: T;
  /** If a value type is an array, you must explicitly provide the keys of those params as an array. */
  arrayParams?: {
    [K in keyof T]: NonNullable<T[K]> extends unknown[] ? K : never;
  }[keyof T][];
  /** Function that validates the schema value. It must throw on failure. */
  validate: (params: {
    [K in keyof T]?: NonNullable<T[K]> extends unknown[]
      ? T[K] | string[]
      : T[K] | string;
  }) => T;
  /**
   * Skips runtime validation for developer input because TypeScript compile-time type checking is sufficient.
   */
  skipValidation?: boolean;
  /** Allows defining only a subset of schema keys. */
  partial?: boolean;
}

export interface SearchParamsSchema<T> {
  defaultValue: T;
  skipValidation: boolean;
  partial: boolean;
  arrayParams: Set<string>;
  validate: (params: Record<keyof T, ParamValue>) => T;
  toString: (params: T) => string;
}

/**
 * Creates a search params schema definition.
 *
 * @param options Schema options.
 */
export function createSearchParamsSchema<T extends Record<string, ParamValue>>(
  options: { partial?: false } & BaseOption<T>,
): SearchParamsSchema<T>;
export function createSearchParamsSchema<T extends Record<string, ParamValue>>(
  options: { partial: true } & BaseOption<Partial<T>>,
): SearchParamsSchema<Partial<T>>;
export function createSearchParamsSchema<T extends Record<string, ParamValue>>(
  options:
    | ({ partial?: false } & BaseOption<T>)
    | ({ partial: true } & BaseOption<Partial<T>>),
) {
  const {
    defaultValue,
    skipValidation = false,
    partial = false,
    arrayParams = [],
    validate,
  } = options;

  /**
   * Converts schema-typed params into a URL query string.
   */
  const toString = (params: typeof defaultValue): string => {
    const nextState = skipValidation ? params : validate(params);

    return objectToURLSearchParams(nextState).toString();
  };

  return {
    defaultValue,
    skipValidation,
    partial,
    arrayParams: new Set(arrayParams as string[]),
    validate,
    toString,
  };
}
