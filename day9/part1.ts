import XMASCode from "./XMASCode.ts";
import inputAsNumbers from "./inputAsNumbers.ts";

const testInput = await inputAsNumbers("./test.txt");
const testCode = new XMASCode(5);
const testAnswer = testInput.find((v) => !testCode.addNumber(v));

console.log(`The answer for the test input is ${testAnswer}`);

const realInput = await inputAsNumbers("./input.txt");
const realCode = new XMASCode();
const realAnswer = realInput.find((v) => !realCode.addNumber(v));

console.log(`The answer for the real input is ${realAnswer}`);
