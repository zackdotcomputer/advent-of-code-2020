import Register from "./MadRegister.ts";

const testInput = (await Deno.readTextFile("./test2.txt")).split("\n");
const testRegister = new Register();
testInput.forEach((s) => testRegister.applyInstruction(s));
console.log(`The test answer is ${testRegister.sumAll()}`);

const realInput = (await Deno.readTextFile("./real.txt")).split("\n");
const realRegister = new Register();
realInput.forEach((s) => realRegister.applyInstruction(s));
console.log(`The real answer is ${realRegister.sumAll()}`);
