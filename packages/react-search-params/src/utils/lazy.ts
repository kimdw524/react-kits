export type Lazy<T> = T | (() => T);

export const resolveLazy = <T>(lazy: Lazy<T>): T =>
  typeof lazy === 'function' ? (lazy as () => T)() : lazy;
