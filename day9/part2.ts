import XMASCode from "./XMASCode.ts";
import inputAsNumbers from "./inputAsNumbers.ts";

const testInput = await inputAsNumbers("./test.txt");
const testCode = new XMASCode(5);
const testAnswer = testInput.find((v) => !testCode.addNumber(v)) ?? NaN;
const testFactor = testCode.findEncryptionWeakness(testAnswer);

console.log(`The answer for the test input is ${testFactor}`);

const realInput = await inputAsNumbers("./input.txt");
const realCode = new XMASCode();
const realAnswer = realInput.find((v) => !realCode.addNumber(v)) ?? NaN;
const realFactor = realCode.findEncryptionWeakness(realAnswer);

console.log(`The answer for the real input is ${realFactor}`);
