import { rockPaperScisors, SingleRow, OpTurn, MyTurn } from "./data/02.ts";
import { sum } from "./utils/array.ts";

type Signs = "Rock" | "Paper" | "Scissors";
type Result = "Win" | "Draw" | "Loss";

const myTurnMap = {
  X: "Rock",
  Y: "Paper",
  Z: "Scissors",
} satisfies Record<string, Signs>;

const opTurnMap = {
  A: "Rock",
  B: "Paper",
  C: "Scissors",
} satisfies Record<string, Signs>;

const scoreSignMap = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
} satisfies Record<Signs, number>;

const scoreWinMap: Record<Result, number> = {
  Win: 6,
  Draw: 3,
  Loss: 0,
};

const winMap: Record<`${Signs}${Signs}`, Result> = {
  RockPaper: "Loss",
  RockRock: "Draw",
  RockScissors: "Win",
  PaperPaper: "Draw",
  PaperScissors: "Loss",
  PaperRock: "Win",
  ScissorsRock: "Loss",
  ScissorsScissors: "Draw",
  ScissorsPaper: "Win",
} as const;

const pickSignMap: Record<`${Signs}${keyof typeof myTurnMap}`, Signs> = {
  PaperX: "Rock",
  PaperY: "Paper",
  PaperZ: "Scissors",
  RockX: "Scissors",
  RockY: "Rock",
  RockZ: "Paper",
  ScissorsX: "Paper",
  ScissorsY: "Scissors",
  ScissorsZ: "Rock",
};

const calcScore: (plSigns: [Signs, Signs]) => number = ([pl1, pl2]) =>
  scoreWinMap[winMap[`${pl2}${pl1}`]] + scoreSignMap[pl2];
const toSigns: (plSigns: [OpTurn, MyTurn]) => [Signs, Signs] = ([pl1, pl2]) => [
  opTurnMap[pl1],
  myTurnMap[pl2],
];
const toSignsPickWinning: (plSigns: [OpTurn, MyTurn]) => [Signs, Signs] = ([
  pl1,
  pl2,
]) => [opTurnMap[pl1], pickSignMap[`${opTurnMap[pl1]}${pl2}`]];

const preprocessedData = rockPaperScisors
  .split("\n")
  .map((line: SingleRow) => line.split(" ", 1))
  .filter((row) => row.length === 2) as [OpTurn, MyTurn][];

const output1 = sum(preprocessedData.map(toSigns).map(calcScore));

const output2 = sum(preprocessedData.map(toSignsPickWinning).map(calcScore));

console.log(output1, output2);
