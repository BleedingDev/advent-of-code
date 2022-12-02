import { realInput } from "./data/01.ts";
import { sum, maxN } from "./utils/array.ts";

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
