export default class Game {
  lastSpoken: number | undefined;
  turnsTaken: number = 0;

  lastSpokenAt = new Map<number, number>();

  starter: string;

  constructor(starting: string) {
    this.starter = starting;
  }

  reset() {
    this.lastSpoken = undefined;
    this.turnsTaken = 0;
    this.lastSpokenAt = new Map<number, number>();

    this.starter
      .split(",")
      .map((s) => parseInt(s.trim()))
      .forEach((n) => this.say(n));
  }

  findNth(nthTurn: number): number {
    this.reset();

    while (this.turnsTaken < nthTurn) {
      this.takeTurn();

      // if (this.turnsTaken > 0 && this.turnsTaken % 1000000 === 0) {
      //   console.debug(`Taken ${this.turnsTaken} turns`);
      //   console.debug(`Recorded ${this.lastSpokenAt.size} numbers`);
      // }
    }

    return this.lastSpoken ?? NaN;
  }

  takeTurn() {
    const lastSpokenAt = this.lastSpokenAt.get(this.lastSpoken!);

    if (lastSpokenAt !== undefined) {
      this.say(this.turnsTaken - lastSpokenAt);
    } else {
      this.say(0);
    }
  }

  say(n: number) {
    if (this.lastSpoken !== undefined) {
      this.lastSpokenAt.set(this.lastSpoken, this.turnsTaken);
    }

    this.turnsTaken += 1;
    this.lastSpoken = n;
  }
}
