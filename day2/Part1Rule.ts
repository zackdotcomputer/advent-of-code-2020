import { RuleLike } from "./RuleCounter.ts";

export default class RowRule implements RuleLike {
  static extract(rule: string): RowRule | undefined {
    const ruleReg = /(\d+)-(\d+) (\w)/;
    const result = ruleReg.exec(rule.trim());

    if (!result) {
      console.warn("Aborting cause of invalid rule " + rule);
      return undefined;
    }

    const min = parseInt(result[1]);
    const max = parseInt(result[2]);
    const char = result[3];

    if (min > max) {
      return undefined;
    }

    return new RowRule(min, max, char);
  }

  min: number;
  max: number;
  character: string;

  constructor(min: number, max: number, character: string) {
    this.min = min;
    this.max = max;
    this.character = character;
  }

  evaluate(test: string): boolean {
    let count = 0;

    for (let index = 0; index < test.length; index++) {
      if (this.character === test.charAt(index)) {
        count += 1;
      }
    }

    return this.min <= count && this.max >= count;
  }
}
