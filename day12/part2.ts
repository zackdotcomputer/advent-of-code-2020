import Ship from "./WaypointShip.ts";

const testInput = await Deno.readTextFile("./test.txt");
const testShip = new Ship();
testShip.apply(testInput.split("\n"));
console.log(`The test ship ended ${testShip.manhattanDistance()} away`);

const realInput = await Deno.readTextFile("./real.txt");
const realShip = new Ship();
realShip.apply(realInput.split("\n"));
console.log(`The real ship ended ${realShip.manhattanDistance()} away`);
