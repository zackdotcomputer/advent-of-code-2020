export enum Instruction {
  left = "L",
  right = "R",
  forward = "F",
  north = "N",
  south = "S",
  east = "E",
  west = "W",
}

export default class Step {
  instruction: Instruction;
  value: number;

  constructor(encoded: string) {
    this.instruction = encoded.substring(0, 1) as Instruction;
    this.value = parseInt(encoded.substring(1));
  }
}
