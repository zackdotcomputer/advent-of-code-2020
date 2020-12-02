import findAnswer from "./solution-part1.ts";

// Run the test input
const testAnswer = findAnswer([1721, 979, 366, 299, 675, 1456]);
console.log(`The answer for the test input is ${testAnswer}`);

const inputText: string = await Deno.readTextFile("./input.txt");
const input = inputText.split("\n").flatMap((n) => {
  if (n.length > 0) {
    return [parseInt(n)];
  } else {
    return [];
  }
});

const part1 = findAnswer(input);
console.log(`The part 1 answer for the true input is ${part1}`);
