import Game from "./Game.ts";

const testGame = new Game("0,3,6");
console.log(`The test answer is ${testGame.findNth(2020)}`);

const realGame = new Game("0,20,7,16,1,18,15");
console.log(`The real answer is ${realGame.findNth(2020)}`);
