import Passport from "./Passport.ts";

function countValid(input: string): number {
  const passports = input
    .split("\n\n")
    .filter((s) => s.trim().length > 0)
    .map((p) => new Passport(p))
    .filter((s) => s.isValid());
  return passports.length;
}

const testInput: string = await Deno.readTextFile("./test-part2.txt");
const test = countValid(testInput);

console.log(`The answer for the test input is ${test}`);

const inputText: string = await Deno.readTextFile("./input.txt");
const answer = countValid(inputText);

console.log(`The answer for part 2 is ${answer}`);
