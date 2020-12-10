import countGaps from "./gapCounter.ts";
import inputAsNumbers from "./inputAsNumbers.ts";

const testInput = await inputAsNumbers("./test.txt");
const { jolt1: testGap1, jolt3: testGap3 } = countGaps(testInput);

console.log(`The test input has ${testGap1} 1-gaps and ${testGap3} 3-gaps`);

const realInput = await inputAsNumbers("./input.txt");
const { jolt1: realGap1, jolt3: realGap3 } = countGaps(realInput);

console.log(`The real input has ${realGap1} 1-gaps and ${realGap3} 3-gaps`);
