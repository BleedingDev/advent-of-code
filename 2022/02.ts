import { rockPaperScisors } from "./data/02.ts";
import { sum } from "./utils/array.ts";

type AllowedSigns = "Rock" | "Paper" | "Scissors";
type Result = "Win" | "Draw" | "Loss";

const myTurnMap = {
  X: "Rock",
  Y: "Paper",
  Z: "Scissors",
} satisfies Record<string, AllowedSigns>;

const opTurnMap = {
  A: "Rock",
  B: "Paper",
  C: "Scissors",
} satisfies Record<string, AllowedSigns>;

const scoreSignMap = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
} satisfies Record<AllowedSigns, number>;

const scoreWinMap: Record<Result, number> = {
  Win: 6,
  Draw: 3,
  Loss: 0,
};

const winMap: Record<`${AllowedSigns}${AllowedSigns}`, Result> = {
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

const pickSignMap: Record<
  `${AllowedSigns}${keyof typeof myTurnMap}`,
  AllowedSigns
> = {
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

const calcScore = ([pl1, pl2]: [AllowedSigns, AllowedSigns]): number =>
  scoreWinMap[winMap[`${pl2}${pl1}`]] + scoreSignMap[pl2];
const toSigns = ([pl1, pl2]: [
  keyof typeof opTurnMap,
  keyof typeof myTurnMap
]): [AllowedSigns, AllowedSigns] => [opTurnMap[pl1], myTurnMap[pl2]];
const toSignsPickWinning = ([pl1, pl2]: [
  keyof typeof opTurnMap,
  keyof typeof myTurnMap
]): [AllowedSigns, AllowedSigns] => [
  opTurnMap[pl1],
  pickSignMap[`${opTurnMap[pl1]}${pl2}`],
];

const output1 = sum(
  rockPaperScisors
    .split("\n")
    .map((line) => line.split(" "))
    .filter((row) => row.length === 2)
    .map(toSigns)
    .map(calcScore)
);

const output2 = sum(
  rockPaperScisors
    .split("\n")
    .map((line) => line.split(" "))
    .filter((row) => row.length === 2)
    .map(toSignsPickWinning)
    .map(calcScore)
);

console.log(output1, output2);
