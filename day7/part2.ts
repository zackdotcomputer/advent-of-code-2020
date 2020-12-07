import BagTree from "./BagTree.ts";

const testInput: string[] = (await Deno.readTextFile("./part2-test.txt")).split(
  "\n"
);
const testTree = new BagTree(testInput);
const testContents = testTree.fullContents("shiny gold");
const testContentsCount = testContents.reduce<number>(
  (soFar, { count }) => soFar + count,
  0
);

console.log(`The answer for the test input is ${testContentsCount}`);

const part2Input: string[] = (await Deno.readTextFile("./input.txt")).split(
  "\n"
);
const part2Tree = new BagTree(part2Input);
const contents = part2Tree.fullContents("shiny gold");
const contentsCount = contents.reduce<number>(
  (soFar, { count }) => soFar + count,
  0
);

console.log(`The answer for the test input is ${contentsCount}`);
