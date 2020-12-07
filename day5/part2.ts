import findMissingSeats from "./findMissingSeats.ts";
import Seat from "./Seat.ts";

const inputText: string = await Deno.readTextFile("./input.txt");
const seats = inputText.split("\n").map((i) => {
  return new Seat(i);
});

console.log(`The answer for part 2 is ${findMissingSeats(seats)}`);
