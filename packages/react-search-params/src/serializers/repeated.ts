import type { ParamValue, Serializer } from '#types';

/**
 * Creates a serializer that encodes arrays as repeated query keys.
 */
export const repeated = (): Serializer => {
  const serialize: Serializer['serialize'] = (value: ParamValue) => {
    if (Array.isArray(value)) {
      return value.map(String);
    }

    return [String(value)];
  };

  const deserialize: Serializer['deserialize'] = (
    searchParams: URLSearchParams,
  ) => {
    const result: Record<string, string | string[]> = {};

    for (const key of searchParams.keys()) {
      const values = searchParams.getAll(key);

      if (values.length === 0) {
        continue;
      }

      result[key] = values.length > 1 ? values : values[0]!;
    }

    return result;
  };

  return { serialize, deserialize };
};
