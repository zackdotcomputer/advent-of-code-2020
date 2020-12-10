export default class XMASCode {
  stack: number[] = [];
  fullStack: number[] = [];
  preambleLength: number;

  constructor(preambleLength: number = 25) {
    this.preambleLength = preambleLength;
  }

  /// Returns whether that number is preamble valid
  addNumber(next: number): boolean {
    this.fullStack.push(next);

    if (this.stack.length < this.preambleLength) {
      this.stack.push(next);
      return true;
    }

    let wasValid = false;
    for (let i = 0; i < this.stack.length; i++) {
      for (let j = 0; j < this.stack.length; j++) {
        const iElement = this.stack[i];
        const jElement = this.stack[j];

        if (i !== j && iElement + jElement === next) {
          wasValid = true;
        }
      }
    }

    this.stack = [...this.stack.slice(1), next];
    return wasValid;
  }

  findEncryptionWeakness(incorrectNumber: number): number {
    for (let i = 0; i < this.fullStack.length; i++) {
      const startingElement = this.fullStack[i];

      let j = i + 1;
      for (; j <= this.fullStack.length; j++) {
        const sliced = this.fullStack.slice(i, j);
        const sum = sumArray(sliced);

        if (sum === incorrectNumber) {
          return findMax(sliced) + findMin(sliced);
        }

        if (sum > incorrectNumber) {
          break;
        }
      }
    }

    return NaN;
  }
}

function findMin(arr: number[]): number {
  let min = arr[0];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element < min) {
      min = element;
    }
  }

  return min;
}

function findMax(arr: number[]): number {
  let min = arr[0];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element > min) {
      min = element;
    }
  }

  return min;
}

function sumArray(arr: number[]): number {
  return arr.reduce((soFar, next) => soFar + next);
}
