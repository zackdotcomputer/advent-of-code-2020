export {};

// This assumes all buses are prime and bus[0] isn't "x".
// You could generify this by factorializing the busses and using LCM...
function findAnswer(input: string): number {
  const lines = input.split("\n");
  const busses = lines[1].split(",").map((b) => parseInt(b));

  let solution = busses[0];
  let stepSize = busses[0];

  for (let i = 1; i < busses.length; i++) {
    const thisBus = busses[i];

    if (isNaN(thisBus)) {
      continue;
    }

    for (let candidate = solution; true; candidate += stepSize) {
      if ((candidate + i) % thisBus === 0) {
        solution = candidate;
        stepSize *= thisBus;
        break;
      }
    }
  }

  return solution;
}

const testInput = await Deno.readTextFile("./test.txt");
console.log(`The test schedule answer is ${findAnswer(testInput)}`);

const realInput = await Deno.readTextFile("./real.txt");
console.log(`The real schedule answer is ${findAnswer(realInput)}`);
