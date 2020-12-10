import Instruction, { InstructionType } from "./Instruction.ts";

export default class Program {
  steps: Instruction[];

  constructor(steps: Instruction[]) {
    this.steps = steps;
  }

  static fromFile(program: string): Program {
    return new Program(program.split("\n").map((i) => Instruction.fromLine(i)));
  }

  findAccValueAtLoop(): number {
    return this.runUntilLoopOrExit().acc;
  }

  findExitAccValue(): number {
    for (let i = 0; i < this.steps.length; i++) {
      const element = this.steps[i];
      if (element.type === InstructionType.acc) {
        continue;
      }

      const newStepI = new Instruction(
        element.type === InstructionType.noop
          ? InstructionType.jump
          : InstructionType.noop,
        element.argument
      );
      const newSteps = [...this.steps];
      newSteps[i] = newStepI;
      const newMe = new Program(newSteps);
      const result = newMe.runUntilLoopOrExit();
      if (result.didExit) {
        return result.acc;
      }
    }

    return NaN;
  }

  runUntilLoopOrExit(
    currentStep: number = 0,
    accValue: number = 0,
    visitedSteps: Set<number> = new Set()
  ): { acc: number; didExit: boolean } {
    if (
      visitedSteps.has(currentStep) ||
      currentStep < 0 ||
      currentStep >= this.steps.length
    ) {
      return { acc: accValue, didExit: currentStep === this.steps.length };
    }

    const thisStep = this.steps[currentStep];

    let newCurrentStep = currentStep + 1;
    let newAccValue = accValue;

    switch (thisStep.type) {
      case InstructionType.acc:
        newAccValue = accValue + thisStep.argument;
        break;
      case InstructionType.jump:
        newCurrentStep = currentStep + thisStep.argument;
        break;
      case InstructionType.noop:
        break;
    }

    const newVisited = visitedSteps.add(currentStep);
    return this.runUntilLoopOrExit(newCurrentStep, newAccValue, newVisited);
  }
}
