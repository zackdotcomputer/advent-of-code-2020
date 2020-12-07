import Seat from "./Seat.ts";

export default function findMissingSeats(seats: Seat[]): number {
  const maxRow = 127;
  const maxCol = 7;
  const maxID = maxRow * 8 + maxCol;

  let spaceFilled: boolean[] = new Array<boolean>(maxID);
  seats.forEach((s) => {
    spaceFilled[s.id()] = true;
  });

  for (let i = 1; i < spaceFilled.length - 1; i++) {
    if (!spaceFilled[i] && spaceFilled[i - 1] && spaceFilled[i + 1]) {
      return i;
    }
  }

  return NaN;
}
