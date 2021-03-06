import Program from "./Program.ts";

const testInput = await Deno.readTextFile("./test.txt");
const testProgram = Program.fromFile(testInput);
const testAnswer = testProgram.findExitAccValue();

console.log(`The answer for the test input is ${testAnswer}`);

const realInput = await Deno.readTextFile("./input.txt");
const realProgram = Program.fromFile(realInput);
const realAnswer = realProgram.findExitAccValue();

console.log(`The answer for the real input is ${realAnswer}`);
