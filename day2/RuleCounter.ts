export default function countValidRows(
  getRule: (rawRule: string) => RuleLike | undefined,
  rows: string[]
): number {
  let count = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (isRowValid(getRule, row)) {
      count += 1;
    }
  }

  return count;
}

function isRowValid(
  getRule: (rawRule: string) => RuleLike | undefined,
  row: string
): boolean {
  const rowParts = row.split(": ");

  // If we don't have a rule and body, abort
  if (rowParts.length !== 2) {
    return false;
  }

  const rule = getRule(rowParts[0]);
  return rule?.evaluate(rowParts[1]) ?? false;
}

export interface RuleLike {
  evaluate(test: string): boolean;
}
