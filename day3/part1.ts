import tobogganRun from "./Toboggan.ts";
import TreeMap from "./TreeMap.ts";

const testInput: string = await Deno.readTextFile("./test.txt");
let test = tobogganRun(new TreeMap(testInput));

console.log(`The answer for the test input is ${test}`);

const inputText: string = await Deno.readTextFile("./input.txt");
let answer = tobogganRun(new TreeMap(inputText));

console.log(`The answer for part 1 is ${answer}`);
