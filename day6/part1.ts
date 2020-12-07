import AnswerGroup from "./OrAnswerGroup.ts";

const testInput: string = await Deno.readTextFile("./test.txt");
const testAnswers = testInput
  .split("\n\n")
  .map((i) => new AnswerGroup(i).answerCount());
const test = testAnswers.reduce((soFar, next) => soFar + next);

console.log(`The answer for the test input is ${test}`);

const Input: string = await Deno.readTextFile("./input.txt");
const Answers = Input.split("\n\n").map((i) =>
  new AnswerGroup(i).answerCount()
);
const input = Answers.reduce((soFar, next) => soFar + next);

console.log(`The answer for the input is ${input}`);
