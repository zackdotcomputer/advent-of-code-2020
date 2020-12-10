export default function countGaps(
  joltages: number[]
): { jolt1: number; jolt2: number; jolt3: number } {
  const sorted = [0, ...joltages.sort((a, b) => a - b)];

  let result = {
    jolt1: 0,
    jolt2: 0,
    jolt3: 1, // We always have a final 3-jolt jump to the device
  };

  for (let i = 1; i < sorted.length; i++) {
    const last = sorted[i - 1];
    const current = sorted[i];

    if (current - last === 1) {
      result.jolt1 += 1;
    }
    if (current - last === 2) {
      result.jolt2 += 1;
    }
    if (current - last === 3) {
      result.jolt3 += 1;
    }
  }

  return result;
}
