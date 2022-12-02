import { PositiveInteger, Tuple } from "./types.ts";

export const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);
export const tail = (arr: unknown[]) => (arr.length > 1 ? arr.slice(1) : arr);
export const max = (numbers: number[]): number => {
  return numbers.reduce((acc, curr) => {
    return curr > acc ? curr : acc;
  });
};
export const maxN = <K extends number>(
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
