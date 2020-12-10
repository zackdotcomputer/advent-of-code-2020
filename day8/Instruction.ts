export enum InstructionType {
  noop = "nop",
  acc = "acc",
  jump = "jmp",
}

function isInstructionType(v: string): v is InstructionType {
  return (
    InstructionType.acc === v ||
    InstructionType.noop === v ||
    InstructionType.jump === v
  );
}

export default class Instruction {
  type: InstructionType;
  argument: number;

  constructor(type: InstructionType, argument: number) {
    this.type = type;
    this.argument = argument;
  }

  static fromLine(line: string): Instruction {
    const instructionParts = line.trim().split(" ");

    if (!isInstructionType(instructionParts[0])) {
      throw `Hold up ${instructionParts[0]} isn't an instruction`;
    }

    return new Instruction(instructionParts[0], parseInt(instructionParts[1]));
  }
}
