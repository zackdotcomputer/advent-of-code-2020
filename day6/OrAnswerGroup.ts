const alphabet = "abcdefghijklmnopqrstuvwxyz";

export default class AnswerGroup {
  didAnswer: boolean[] = new Array(alphabet.length);

  constructor(groupAnswers: string) {
    for (let i = 0; i < alphabet.length; i++) {
      const question = alphabet[i];
      this.didAnswer[i] = groupAnswers.indexOf(question) >= 0;
    }
  }

  answerCount(): number {
    return this.didAnswer.filter((b) => b).length;
  }
}
