export class QuizDetailsDto {
  id: string;
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

export class QuizListDto {
  id: string;
  name: string;
  description: string;
}

export class NewQuizDto {
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

export class ApiError {
  status: number;
  message: string;
}
