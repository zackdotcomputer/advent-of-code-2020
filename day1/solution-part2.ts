export default function findAnswer(inputs: number[]): number {
  const target = 2020;

  const sortedInputs = inputs.sort((a, b) => a - b);

  for (let i = 0; i < sortedInputs.length; i++) {
    let iValue = sortedInputs[i];
    if (iValue > target / 2) {
      break;
    }

    for (let j = 0; j < sortedInputs.length; j++) {
      let jValue = sortedInputs[j];
      if (iValue + jValue > target) {
        break;
      }

      for (let k = 0; k < sortedInputs.length; k++) {
        let kValue = sortedInputs[k];
        if (iValue + jValue + kValue > target) {
          break;
        }

        if (iValue + jValue + kValue == target) {
          return iValue * jValue * kValue;
        }
      }
    }
  }

  return -1;
}
