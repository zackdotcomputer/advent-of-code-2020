enum SpaceState {
  floor = ".",
  empty = "L",
  full = "#",
}

export default class World {
  world: SpaceState[][];
  tickCount: number = 0;
  initialState: SpaceState[][];

  constructor(input: string) {
    const rows = input
      .split("\n")
      .map((r) => r.trim().split(""))
      .filter((r) => r.length > 0);

    this.world = rows as SpaceState[][];
    this.initialState = this.world;
  }

  countOccupied(): number {
    return this.world.reduce(
      (soFar, r) =>
        soFar +
        r.reduce(
          (soFar, cell) => soFar + (cell === SpaceState.full ? 1 : 0),
          0
        ),
      0
    );
  }

  tickUntilStable() {
    while (this.tick(this.stateAfterTick.bind(this))) {}
  }

  lineOfSightTickUntilStable() {
    while (this.tick(this.lineOfSightStateAfterTick.bind(this))) {
      // console.debug("Tick", this.tickCount);
      // console.debug(this.world.map((r) => r.join("")).join("\n"));
      // console.debug("\n");
    }
  }

  // Returns if this tick caused a change or not
  tick(newStateFunc: (row: number, col: number) => SpaceState): boolean {
    this.tickCount += 1;

    const oldWorld = [...this.world];
    this.world = this.world.map((r, rowNumber) => {
      return r.map((c, colNumber) => {
        return newStateFunc(rowNumber, colNumber);
      });
    });

    return !World.areWorldsEqual(oldWorld, this.world);
  }

  reset() {
    this.world = this.initialState;
    this.tickCount = 0;
  }

  stateAfterTick(row: number, col: number): SpaceState {
    const currentValue = this.world[row][col];
    if (currentValue === SpaceState.floor) {
      return SpaceState.floor;
    }

    let adjacentOccupied: number = 0;
    for (let rv = -1; rv <= 1; rv++) {
      for (let cv = -1; cv <= 1; cv++) {
        if (rv === 0 && cv === 0) {
          // Skip checking the original cell
          continue;
        }

        const lookRow = row + rv;
        const lookCol = col + cv;

        if (
          lookCol < 0 ||
          lookRow < 0 ||
          lookRow >= this.world.length ||
          lookCol >= this.world[0].length
        ) {
          // Don't look out of bounds
          continue;
        }

        const adjacent = this.world[row + rv][col + cv];
        adjacentOccupied += adjacent === SpaceState.full ? 1 : 0;
      }
    }

    if (currentValue === SpaceState.empty && adjacentOccupied === 0) {
      return SpaceState.full;
    } else if (currentValue === SpaceState.full && adjacentOccupied >= 4) {
      return SpaceState.empty;
    } else {
      return currentValue;
    }
  }

  lineOfSightStateAfterTick(row: number, col: number): SpaceState {
    const currentValue = this.world[row][col];
    if (currentValue === SpaceState.floor) {
      return SpaceState.floor;
    }

    let adjacentOccupied: number = 0;
    for (let rv = -1; rv <= 1; rv++) {
      for (let cv = -1; cv <= 1; cv++) {
        if (rv === 0 && cv === 0) {
          // Skip checking the original cell
          continue;
        }

        const adjacent = this.findFirstSeatInVector(
          { row, col },
          { row: rv, col: cv }
        );
        adjacentOccupied += adjacent === SpaceState.full ? 1 : 0;
      }
    }

    if (currentValue === SpaceState.empty && adjacentOccupied === 0) {
      return SpaceState.full;
    } else if (currentValue === SpaceState.full && adjacentOccupied >= 5) {
      return SpaceState.empty;
    } else {
      return currentValue;
    }
  }

  findFirstSeatInVector(
    from: { row: number; col: number },
    vector: { row: number; col: number }
  ): SpaceState {
    const { row, col } = from;
    const { row: rv, col: cv } = vector;

    const lookRow = row + rv;
    const lookCol = col + cv;

    if (
      lookCol < 0 ||
      lookRow < 0 ||
      lookRow >= this.world.length ||
      lookCol >= this.world[0].length
    ) {
      // Don't look out of bounds
      return SpaceState.floor;
    }

    const adjacent = this.world[row + rv][col + cv];
    if (adjacent === SpaceState.floor) {
      return this.findFirstSeatInVector({ row: lookRow, col: lookCol }, vector);
    } else {
      return adjacent;
    }
  }

  static areWorldsEqual(left: SpaceState[][], right: SpaceState[][]): boolean {
    if (left.length < 1 && right.length < 1) {
      return true;
    }

    if (left.length !== right.length || left[0].length !== right[0].length) {
      return false;
    }

    for (let rowCount = 0; rowCount < left.length; rowCount++) {
      const leftRow = left[rowCount];
      const rightRow = right[rowCount];
      for (let colCount = 0; colCount < leftRow.length; colCount++) {
        if (leftRow[colCount] !== rightRow[colCount]) {
          return false;
        }
      }
    }

    return true;
  }
}
