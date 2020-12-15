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
      const value = parseInt(setMatch[2]);

      const targets = this.findTargetAddresses(address);
      targets.forEach((addr) => (this.memory[addr] = value));

      // console.debug(`Wrote ${value} to `, targets);
    }
  }

  findTargetAddresses(address: number): number[] {
    const addressString = padToLength(
      address.toString(2),
      this.mask.length,
      "0",
      true
    );

    let xesInMask = 0;
    for (let i = 0; i < this.mask.length; i++) {
      if (this.mask[i] === "X") {
        xesInMask += 1;
      }
    }

    let result: number[] = [];

    for (let variant = 0; variant < Math.pow(2, xesInMask); variant++) {
      const variantString = padToLength(
        variant.toString(2),
        xesInMask,
        "0",
        true
      );

      let resultAddress = "";
      let currentX = 0;
      for (let i = 0; i < addressString.length; i++) {
        const maskChar = this.mask[this.mask.length - (i + 1)];

        if (maskChar === "0") {
          resultAddress =
            addressString[addressString.length - (i + 1)] + resultAddress;
        } else if (maskChar === "1") {
          resultAddress = "1" + resultAddress;
        } else if (maskChar === "X") {
          currentX += 1;
          resultAddress =
            variantString[variantString.length - currentX] + resultAddress;
        }
      }

      result.push(parseInt(resultAddress, 2));
    }

    return result;
  }
}

function padToLength(
  str: string,
  length: number,
  padString: string,
  prepend: boolean
): string {
  let pad = "";
  while (pad.length < length - str.length) {
    pad += padString;
  }

  if (prepend) {
    return pad + str;
  } else {
    return str + pad;
  }
}
