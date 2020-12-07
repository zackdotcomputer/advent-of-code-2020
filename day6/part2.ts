import AnswerGroup from "./AndAnswerGroup.ts";

const testInput: string = await Deno.readTextFile("./test.txt");
const testAnswers = testInput
  .split("\n\n")
  .map((i) => new AnswerGroup(i).answerCount());
const test = testAnswers.reduce((soFar, next) => soFar + next);

console.log(`The answer for the test input is ${test}`);

const input: string = await Deno.readTextFile("./input.txt");
const Answers = input
  .split("\n\n")
  .map((i) => new AnswerGroup(i).answerCount());
const answer = Answers.reduce((soFar, next) => soFar + next);

console.log(`The answer for the input is ${answer}`);
