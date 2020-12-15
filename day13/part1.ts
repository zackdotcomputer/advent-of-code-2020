export {};

function findAnswer(input: string): number {
  const lines = input.split("\n");
  const earliestTimestamp = parseInt(lines[0]);
  const busses = lines[1].split(",").flatMap((b) => {
    const busId = parseInt(b);
    if (isNaN(busId)) {
      return [];
    }
    return [busId];
  });

  let bestWait: { id: number; wait: number } | undefined = undefined;
  for (let i = 0; i < busses.length; i++) {
    const b = busses[i];
    const wait = b - (earliestTimestamp % b);
    if (bestWait === undefined || wait < bestWait.wait) {
      bestWait = {
        id: b,
        wait,
      };
    }
  }

  if (!bestWait) {
    return -1;
  }

  return bestWait.id * bestWait.wait;
}

const testInput = await Deno.readTextFile("./test.txt");
console.log(`The test schedule answer is ${findAnswer(testInput)}`);

const realInput = await Deno.readTextFile("./real.txt");
console.log(`The real schedule answer is ${findAnswer(realInput)}`);
