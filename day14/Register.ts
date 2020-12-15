const maskInstruction = /^mask = ([01X]+)$/;
const setInstruction = /^mem\[(\d+)\] = (\d+)$/;

export default class Register {
  memory: { [key: number]: number } = {};
  mask: string = "";

  sumAll(): number {
    return Object.values(this.memory).reduce(
      (soFar, current) => soFar + current
    );
  }

  applyInstruction(instruction: string) {
    const maskMatch = maskInstruction.exec(instruction);
    if (maskMatch) {
      this.mask = maskMatch[1];
      // console.debug(`Set mask to ${maskMatch[1]}`);
      return;
    }

    const setMatch = setInstruction.exec(instruction);
    if (setMatch) {
      const address = parseInt(setMatch[1]);
      const value = parseInt(setMatch[2]).toString(2);

      let doctored: string = "";
      for (let i = 0; i < value.length || i < this.mask.length; i++) {
        const valueChar =
          i < value.length ? value[value.length - (i + 1)] : "0";
        const maskChar =
          i < this.mask.length ? this.mask[this.mask.length - (i + 1)] : "X";

        const resultChar = maskChar === "X" ? valueChar : maskChar;
        doctored = resultChar + doctored;
      }

      this.memory[address] = parseInt(doctored, 2);

      // console.debug(`Set ${address} to ${doctored}`);
    }
  }
}
