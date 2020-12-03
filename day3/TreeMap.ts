import Point from "./Point.ts";

export default class TreeMap {
  trees: boolean[][];

  constructor(treeMap: string) {
    this.trees = treeMap
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((row) => {
        let result: boolean[] = [];
        for (let i = 0; i < row.length; i++) {
          result.push(row[i] == "#");
        }
        return result;
      });
  }

  numberOfRows(): number {
    return this.trees.length;
  }

  isTree(point: Point): boolean {
    if (point.y >= this.numberOfRows()) {
      return false;
    }

    const thisRow = this.trees[point.y];

    return thisRow[point.x % thisRow.length];
  }
}
