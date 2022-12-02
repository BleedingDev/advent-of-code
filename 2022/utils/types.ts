export type NonNegativeInteger<T extends number> = number extends T
  ? never
  : `${T}` extends `-${string}` | `${string}.${string}`
  ? never
  : T;
export type PositiveInteger<T extends number> = NonNegativeInteger<T> extends 0
  ? never
  : T;

export type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;

type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;
