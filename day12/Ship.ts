import { degreesToRadians, Position } from "./Geometry.ts";
import Step, { Instruction } from "./Step.ts";

export default class Ship {
  position: Position = { x: 0, y: 0 };
  heading: number = 90; // east in degrees

  apply(instructions: string[]) {
    const steps = instructions
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((i) => new Step(i));

    steps.forEach((s) => {
      switch (s.instruction) {
        case Instruction.east:
          this.position.x += s.value;
          break;
        case Instruction.west:
          this.position.x -= s.value;
          break;
        case Instruction.north:
          this.position.y += s.value;
          break;
        case Instruction.south:
          this.position.y -= s.value;
          break;
        case Instruction.left:
          this.heading -= s.value;
          while (this.heading < 0) {
            this.heading += 360;
          }
          break;
        case Instruction.right:
          this.heading = (this.heading + s.value) % 360;
          break;
        case Instruction.forward:
          const opp = Math.sin(degreesToRadians(this.heading % 90)) * s.value;
          const adj = Math.cos(degreesToRadians(this.heading % 90)) * s.value;

          let deltaX: number;
          let deltaY: number;
          // Divide by quadrants to determine the actual solution here
          if (this.heading < 90) {
            deltaX = opp;
            deltaY = adj;
          } else if (this.heading < 180) {
            deltaX = adj;
            deltaY = -1 * opp;
          } else if (this.heading < 270) {
            deltaX = -1 * opp;
            deltaY = -1 * adj;
          } else {
            deltaX = -1 * adj;
            deltaY = opp;
          }

          this.position = {
            x: this.position.x + deltaX,
            y: this.position.y + deltaY,
          };

          break;
      }
    });
  }

  manhattanDistance(): number {
    return Math.abs(this.position.x) + Math.abs(this.position.y);
  }
}
