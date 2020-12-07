import Passport from "./Passport.ts";

function countValid(input: string): number {
  const passports = input
    .split("\n\n")
    .filter((s) => s.trim().length > 0)
    .map((p) => new Passport(p));

  let count = 0;
  passports.forEach((p) => {
    if (p.hasRequiredFields()) {
      count += 1;
    }
  });

  return count;
}

const testInput: string = await Deno.readTextFile("./test.txt");
const test = countValid(testInput);

console.log(`The answer for the test input is ${test}`);

const inputText: string = await Deno.readTextFile("./input.txt");
const answer = countValid(inputText);

console.log(`The answer for part 1 is ${answer}`);
