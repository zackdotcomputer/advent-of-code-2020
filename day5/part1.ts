import Seat from "./Seat.ts";

const testInput: string = await Deno.readTextFile("./test.txt");
const seats = testInput.split("\n").map((i) => new Seat(i));
console.debug(seats);
const testMax = Math.max(...seats.map((s) => s.id()));

console.log(`The highest id for the test input is ${testMax}`);

const inputText: string = await Deno.readTextFile("./input.txt");
const inputIDs = inputText.split("\n").map((i) => {
  return new Seat(i).id();
});
const max = Math.max(...inputIDs);

console.log(`The answer for part 1 is ${max}`);
