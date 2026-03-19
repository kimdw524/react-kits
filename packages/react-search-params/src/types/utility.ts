export type HasDuplicates<T extends readonly unknown[]> = T extends readonly [
  infer H,
  ...infer R,
]
  ? H extends R[number]
    ? true
    : HasDuplicates<R>
  : false;

export type NoDuplicates<T extends readonly unknown[]> =
  HasDuplicates<T> extends true ? never : T;
