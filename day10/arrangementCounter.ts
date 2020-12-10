export default function countArrangements(joltages: number[]): number {
  const rawSorted = joltages.sort((a, b) => a - b);
  const terminalJolt = rawSorted[rawSorted.length - 1] + 3;
  const sorted = [0, ...rawSorted, terminalJolt];

  const droppableIndices: number[] = [];

  // The first and last values are fixed and not droppable.
  for (let i = 1; i < sorted.length - 1; i++) {
    const last = sorted[i - 1];
    const next = sorted[i + 1];

    // If this index could be dropped and maintain a valid chain, note that.
    if (next - last <= 3) {
      droppableIndices.push(i);
    }
  }

  // Now break up those droppable indices into runs of adjacent indices
  const adjacentSwitchRuns: number[][] = [];
  for (let i = 0; i < droppableIndices.length; ) {
    let runLength: number = 2;
    for (; runLength + i <= droppableIndices.length; runLength++) {
      if (hasGap(droppableIndices.slice(i, i + runLength))) {
        runLength -= 1;
        break;
      }
    }

    adjacentSwitchRuns.push(droppableIndices.slice(i, i + runLength));
    i += runLength;
  }

  const allPossibilities = adjacentSwitchRuns.reduce((soFar, next) => {
    const currentPossibilities = countPossibilities(next, sorted);
    return soFar * currentPossibilities;
  }, 1);

  return allPossibilities;
}

/// Count how many ways the toDropIndices could be dropped from fromList without
/// making a gap greater than 3
function countPossibilities(
  toDropIndices: number[],
  fromList: number[]
): number {
  // We've already done the work to know that solo-indices are droppable.
  if (toDropIndices.length === 1) {
    return 2;
  }

  let validCount = 0;
  // Walk through all other possible variations of include/exclude for this run and count.
  for (
    let possibility = 0;
    possibility < Math.pow(2, toDropIndices.length);
    possibility++
  ) {
    const tryDropping = binaryMask(toDropIndices, possibility);
    const afterDropping = dropFromArray(fromList, tryDropping);
    const isValid = !hasGap(afterDropping, 3);
    if (isValid) {
      validCount += 1;
    }
  }

  return validCount;
}

function dropFromArray(arr: number[], indicesToDrop: number[]): number[] {
  return arr.filter((_, index) => {
    return indicesToDrop.indexOf(index) < 0;
  });
}

function binaryMask(arr: number[], maskForBinary: number): number[] {
  let asBinary = (maskForBinary >>> 0).toString(2);

  // Adjust asBinary up or down to the same length as the array
  while (asBinary.length < arr.length) {
    asBinary = "0" + asBinary;
  }

  if (asBinary.length > arr.length) {
    asBinary = asBinary.substring(asBinary.length - arr.length);
  }

  return arr.filter((_, index) => {
    return asBinary[index] !== "1";
  });
}

function hasGap(arr: number[], greaterThan: number = 1): boolean {
  for (let i = 1; i < arr.length; i++) {
    const last = arr[i - 1];
    const current = arr[i];

    if (current - last > greaterThan) {
      return true;
    }
  }

  return false;
}
