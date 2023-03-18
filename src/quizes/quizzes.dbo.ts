import { ObjectId } from 'mongodb';

export class NewQuizDbo {
  name: string;
  description: string;
  questions: Array<{
    text: string;
    options: Array<{
      id: number;
      text: string;
    }>;
    answer: number;
  }>;
}

export class QuizDetailsDbo extends NewQuizDbo {
  _id: ObjectId;
}

export class QuizListDbo {
  _id: ObjectId;
  name: string;
  description: string;
}
