import World from "./World.ts";

const testInput = await Deno.readTextFile("./test.txt");
const testWorld = new World(testInput);
testWorld.lineOfSightTickUntilStable();
console.log(
  `The test input stabilized on ${testWorld.countOccupied()} occupants`
);

const realInput = await Deno.readTextFile("./real.txt");
const realWorld = new World(realInput);
realWorld.lineOfSightTickUntilStable();
console.log(
  `The real input stabilized on ${realWorld.countOccupied()} occupants`
);
