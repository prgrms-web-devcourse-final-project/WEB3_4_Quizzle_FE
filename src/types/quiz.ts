export type Quiz = {
    quizId: string;
    quizText: {
      [key: string]: string;
    },
    answerKey: {
      [key: string]: string;
    }
  }