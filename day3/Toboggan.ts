import Point from "./Point.ts";
import TreeMap from "./TreeMap.ts";

export default function tobogganRun(
  field: TreeMap,
  slopeVector: Point = { x: 3, y: 1 }
): number {
  let currentPoint: Point = { x: 0, y: 0 };

  let treesHit: number = 0;

  while (currentPoint.y < field.numberOfRows()) {
    currentPoint = {
      x: currentPoint.x + slopeVector.x,
      y: currentPoint.y + slopeVector.y,
    };

    const isTree = field.isTree(currentPoint);

    if (isTree) {
      treesHit += 1;
    }
  }

  return treesHit;
}
