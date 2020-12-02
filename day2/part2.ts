import countValidRows from "./RuleCounter.ts";
import Rule from "./Part2Rule.ts";

const ruleBuilder = Rule.extract;

// Run the test input
const testAnswer = countValidRows(ruleBuilder, [
  "1-3 a: abcde",
  "1-3 b: cdefg",
  "2-9 c: ccccccccc",
]);
console.log(`The answer for the test input is ${testAnswer}`);

const inputText: string = await Deno.readTextFile("./input.txt");
const inputRows = inputText.split("\n");

const part1 = countValidRows(ruleBuilder, inputRows);
console.log(`The part 1 answer for the true input is ${part1}`);
