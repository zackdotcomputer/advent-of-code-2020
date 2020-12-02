export default function findAnswer(inputs: number[]): number {
  const target = 2020;

  const sortedInputs = inputs.sort((a, b) => (a - b));
  const reversedSorted = [...sortedInputs].reverse();

  for (let i = 0; i < sortedInputs.length; i++) {
    let iValue = sortedInputs[i];
    if (iValue > target / 2) {
      break
    }

    for (let j = 0; j < reversedSorted.length; j++) {
      let jValue = reversedSorted[j];
      if (jValue < target / 2) {
        break
      }

      if (iValue + jValue == 2020) {
        return iValue * jValue;
      }
    }
  }

  return -1
}
