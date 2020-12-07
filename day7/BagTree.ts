const ruleRule = /^([a-z ]+) bags contain(( (\d+) ([a-z ]+) bag[s]?[,.]| no other bags.)+)$/;
const contentsRule = /(\d+) ([a-z ]+) bag[s]?[,.]/g;

export default class BagTree {
  colorToNode: { [color: string]: BagNode };

  constructor(rules: string[]) {
    this.colorToNode = {};

    const colorsAndRulesExtracted = rules
      .map((r) => ruleRule.exec(r))
      .flatMap((results) => {
        if (results === null) {
          return [];
        }

        const container = results[1];
        const rawContents = results[2].trim();

        let contents: { count: number; color: string }[] = [];
        if (rawContents.indexOf("no other") === -1) {
          let result = contentsRule.exec(rawContents);
          while (result) {
            contents = [
              ...contents,
              {
                count: parseInt(result[1]),
                color: result[2],
              },
            ];

            result = contentsRule.exec(rawContents);
          }
        }

        return [{ container, contents }];
      });

    colorsAndRulesExtracted.forEach(({ container }) => {
      this.colorToNode[container] = new BagNode(container);
    });

    colorsAndRulesExtracted.forEach(({ container, contents }) => {
      const containerNode = this.colorToNode[container];

      contents
        .map(({ count, color }) => ({ count, node: this.colorToNode[color] }))
        .forEach(({ count, node }) => {
          node.addCanGoIn(containerNode);
          containerNode.addContent(count, node);
        });
    });
  }

  fullContents(rootColor: string): { count: number; color: string }[] {
    const root = this.colorToNode[rootColor];
    return root.mustContain.flatMap(({ count, type }) => {
      return this.recursiveFindContents(count, type);
    });
  }

  recursiveFindContents(
    count: number,
    node: BagNode
  ): { count: number; color: string }[] {
    let results = [{ count, color: node.name }];

    node.mustContain.forEach(({ count: childCount, type: childType }) => {
      const recursed = this.recursiveFindContents(childCount, childType);
      const adjustedForThisCount = recursed.map(
        ({ count: recursedCount, color }) => ({
          color,
          count: recursedCount * count,
        })
      );
      results = [...results, ...adjustedForThisCount];
    });

    return results;
  }

  whatCanHold(type: string, knownSoFar: Set<string> = new Set()): Set<string> {
    const root = this.colorToNode[type];
    const containers = root.canGoIn;

    let nowKnown = knownSoFar;
    containers.forEach((c) => {
      if (!nowKnown.has(c.name)) {
        nowKnown.add(c.name);
        nowKnown = this.whatCanHold(c.name, nowKnown);
      }
    });

    return nowKnown;
  }
}

class BagNode {
  name: string;
  canGoIn: BagNode[] = [];
  mustContain: { count: number; type: BagNode }[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addContent(count: number, type: BagNode) {
    this.mustContain.push({ count, type });
  }

  addCanGoIn(next: BagNode) {
    this.canGoIn.push(next);
  }
}
