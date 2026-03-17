export const filterObject = <
  T extends Record<string, unknown>,
  const K extends readonly (keyof T)[],
>(
  source: T,
  keys: K,
): { [P in K[number]]: T[P] } => {
  const result = {} as { [P in K[number]]: T[P] };

  for (const key of keys) {
    result[key] = source[key];
  }

  return result;
};
