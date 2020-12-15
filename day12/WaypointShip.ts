import { degreesToRadians, Position } from "./Geometry.ts";
import Step, { Instruction } from "./Step.ts";

export default class WaypointShip {
  position: Position = { x: 0, y: 0 };

  // Vector relative to ship as (0, 0)
  waypointPosition: Position = { x: 10, y: 1 };

  apply(instructions: string[]) {
    const steps = instructions
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((i) => new Step(i));

    steps.forEach((s) => {
      switch (s.instruction) {
        case Instruction.east:
          this.waypointPosition.x += s.value;
          break;
        case Instruction.west:
          this.waypointPosition.x -= s.value;
          break;
        case Instruction.north:
          this.waypointPosition.y += s.value;
          break;
        case Instruction.south:
          this.waypointPosition.y -= s.value;
          break;
        case Instruction.left:
          this.rotateWaypoint(-1 * s.value);
          break;
        case Instruction.right:
          this.rotateWaypoint(s.value);
          break;
        case Instruction.forward:
          this.position = {
            x: this.position.x + s.value * this.waypointPosition.x,
            y: this.position.y + s.value * this.waypointPosition.y,
          };
          break;
      }

      // console.debug(`After instruction ${s.instruction} by ${s.value}:`);
      // console.debug(`- Ship is at (${this.position.x}, ${this.position.y})`);
      // console.debug(
      //   `- Waypoint is at (${this.waypointPosition.x}, ${this.waypointPosition.y})`
      // );
    });
  }

  rotateWaypoint(degrees: number) {
    // First, convert current position to polar values

    // R is good old a^2 + b^2 = c^2
    const r = Math.sqrt(
      Math.pow(this.waypointPosition.x, 2) +
        Math.pow(this.waypointPosition.y, 2)
    );
    // Theta is based on trig
    let theta =
      Math.atan(this.waypointPosition.y / this.waypointPosition.x) +
      (this.waypointPosition.x < 0 ? Math.PI : 0);

    // MINUS the degrees, because polar coordinates move anti-clockwise around the origin
    theta -= degreesToRadians(degrees);
    if (theta < 0) {
      theta += 2 * Math.PI;
    }
    theta = theta % (2 * Math.PI);

    this.waypointPosition = {
      x: Math.round(r * Math.cos(theta)),
      y: Math.round(r * Math.sin(theta)),
    };
  }

  manhattanDistance(): number {
    return Math.abs(this.position.x) + Math.abs(this.position.y);
  }
}
