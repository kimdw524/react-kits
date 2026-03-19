import type { ParamValue, Serializer } from '#types';

/**
 * Creates a serializer that encodes arrays as a single delimited query value.
 *
 * @param delimiter Delimiter used to join and split array values.
 */
export const delimiter = (delimiter: string): Serializer => {
  const serialize: Serializer['serialize'] = (value: ParamValue) => {
    if (Array.isArray(value)) {
      return [value.join(delimiter)];
    }

    return [String(value)];
  };

  const deserialize: Serializer['deserialize'] = (
    searchParams: URLSearchParams,
  ) => {
    const result: Record<string, string | string[]> = {};

    for (const key of searchParams.keys()) {
      const value = searchParams.get(key);

      if (value === null) {
        continue;
      }

      const splitted = value.split(delimiter);
      result[key] = splitted.length > 1 ? splitted : splitted[0]!;
    }

    return result;
  };

  return { serialize, deserialize };
};
