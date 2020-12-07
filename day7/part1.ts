import BagTree from "./BagTree.ts";

const testInput: string[] = (await Deno.readTextFile("./test.txt")).split("\n");
const testTree = new BagTree(testInput);
const canHoldGoldTest = testTree.whatCanHold("shiny gold");

console.log(`The answer for the test input is ${canHoldGoldTest.size}`);

const part1Input: string[] = (await Deno.readTextFile("./input.txt")).split(
  "\n"
);
const part1Tree = new BagTree(part1Input);
const canHoldGold = part1Tree.whatCanHold("shiny gold");

console.log(`The answer for the part1 input is ${canHoldGold.size}`);
