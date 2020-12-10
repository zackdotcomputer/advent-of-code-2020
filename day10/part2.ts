import countArrangements from "./arrangementCounter.ts";
import inputAsNumbers from "./inputAsNumbers.ts";

const shorttestInput = await inputAsNumbers("./shorttest.txt");
const shorttestArrangements = countArrangements(shorttestInput);

console.log(
  `The shorttest input has ${shorttestArrangements} possible arrangements`
);

const testInput = await inputAsNumbers("./test.txt");
const testArrangements = countArrangements(testInput);

console.log(`The test input has ${testArrangements} possible arrangements`);

const realInput = await inputAsNumbers("./input.txt");
const realArrangements = countArrangements(realInput);

console.log(`The real input has ${realArrangements} possible arrangements`);
