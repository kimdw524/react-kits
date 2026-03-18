import type { ParamValue, Serializer } from '#types';

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
