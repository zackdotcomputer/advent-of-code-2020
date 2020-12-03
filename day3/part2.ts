import Point from "./Point.ts";
import tobogganRun from "./Toboggan.ts";
import TreeMap from "./TreeMap.ts";

const testSlopes: Point[] = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 5, y: 1 },
  { x: 7, y: 1 },
  { x: 1, y: 2 },
];

function testAll(map: TreeMap): number {
  let answer = undefined;

  for (let i = 0; i < testSlopes.length; i++) {
    const slope = testSlopes[i];
    const thisAnswer = tobogganRun(map, slope);

    answer = answer === undefined ? thisAnswer : answer * thisAnswer;
  }

  return answer ?? -1;
}

const testInput: string = await Deno.readTextFile("./test.txt");
let test = testAll(new TreeMap(testInput));

console.log(`The answer for the test input is ${test}`);

const inputText: string = await Deno.readTextFile("./input.txt");
let answer = testAll(new TreeMap(inputText));

console.log(`The answer for part 1 is ${answer}`);
