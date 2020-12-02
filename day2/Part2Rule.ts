import { RuleLike } from "./RuleCounter.ts";

export default class RowRule implements RuleLike {
  static extract(rule: string): RuleLike | undefined {
    const ruleReg = /(\d+)-(\d+) (\w)/;
    const result = ruleReg.exec(rule.trim());

    if (!result) {
      console.warn("Aborting cause of invalid rule " + rule);
      return undefined;
    }

    const posA = parseInt(result[1]);
    const posB = parseInt(result[2]);
    const char = result[3];

    if (posA > posB) {
      return undefined;
    }

    return new RowRule(posA, posB, char);
  }

  posA: number;
  posB: number;
  character: string;

  constructor(posA: number, posB: number, character: string) {
    this.posA = posA;
    this.posB = posB;
    this.character = character;
  }

  evaluate(test: string): boolean {
    const aMatch = test.charAt(this.posA - 1) === this.character;
    const bMatch = test.charAt(this.posB - 1) === this.character;

    // XOR
    return aMatch !== bMatch;
  }
}
