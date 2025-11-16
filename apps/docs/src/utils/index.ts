/** object의 value의 값이 object이 아닌 것만 필터링 하는 함수 */
export const filterObjectValue = <T extends Record<string, unknown>>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => typeof v !== 'object' && v !== null),
  ) as {
    [K in keyof T as T[K] extends object ? K : never]: T[K];
  };
