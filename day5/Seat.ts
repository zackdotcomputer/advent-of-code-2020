export default class Seat {
  row: number;
  col: number;

  constructor(coded: string) {
    const rawRow = coded.slice(0, 7).replaceAll("F", "0").replaceAll("B", "1");
    const rawCol = coded.slice(7).replaceAll("L", "0").replaceAll("R", "1");

    this.row = parseInt(rawRow, 2);
    this.col = parseInt(rawCol, 2);
  }

  id(): number {
    return this.row * 8 + this.col;
  }
}
