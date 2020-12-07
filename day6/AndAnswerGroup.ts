const alphabet = "abcdefghijklmnopqrstuvwxyz";

function forAll<T>(array: T[], mapper: (arg: T) => boolean): boolean {
  for (let i = 0; i < array.length; i++) {
    if (!mapper(array[i])) {
      return false;
    }
  }

  return true;
}

export default class AnswerGroup {
  didAnswer: boolean[] = new Array(alphabet.length);

  constructor(groupAnswers: string) {
    const allAnswers = groupAnswers.split("\n").filter((s) => s.length > 0);

    for (let i = 0; i < alphabet.length; i++) {
      const question = alphabet[i];

      this.didAnswer[i] = forAll(allAnswers, (a) => a.indexOf(question) >= 0);
    }
  }

  answerCount(): number {
    return this.didAnswer.filter((b) => b).length;
  }
}
