import { realInput } from "./data/01.ts";
import { sum } from "./utils/array.ts";

type PositiveInteger<T extends number> = number extends T
  ? never
  : `${T}` extends `-${string}` | `${string}.${string}`
  ? never
  : T extends 0
  ? never
  : T;
type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

const tail = (arr: unknown[]) => (arr.length > 1 ? arr.slice(1) : arr);
const max = (numbers: number[]): number => {
  return numbers.reduce((acc, curr) => {
    return curr > acc ? curr : acc;
  });
};
const maxN = <K extends number>(
  arr: number[],
  n: PositiveInteger<K>
): Tuple<number, K> =>
  arr.reduce(
    (acc, curr) =>
      acc.length < n
        ? [...acc, curr]
        : curr > acc.sort()[0]
        ? [...tail(acc), curr]
        : acc,
    [] as any
  );

const output = sum(
  maxN(
    realInput
      .split("\n\n")
      .map((oneElf) => oneElf.split("\n").map((str) => +str))
      .map(sum),
    3
  )
);

console.log(output);
