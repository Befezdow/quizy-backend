import { NewQuizDbo, QuizDetailsDbo, QuizListDbo } from './quizzes.dbo';
import { NewQuizDto, QuizDetailsDto, QuizListDto } from './quizzes.dto';

export function quizDetailsDboToDto(data: QuizDetailsDbo): QuizDetailsDto {
  return {
    id: data._id.toString(),
    name: data.name,
    description: data.description,
    questions: data.questions.map((question) => ({
      text: question.text,
      answer: question.answer,
      options: question.options.map((option) => ({
        id: option.id,
        text: option.text,
      })),
    })),
  };
}

export function quizListDboToDto(data: QuizListDbo): QuizListDto {
  return {
    id: data._id.toString(),
    name: data.name,
    description: data.description,
  };
}

export function newQuizDtoToDbo(data: NewQuizDto): NewQuizDbo {
  return {
    name: data.name,
    description: data.description,
    questions: data.questions.map((question) => ({
      text: question.text,
      answer: question.answer,
      options: question.options.map((option) => ({
        id: option.id,
        text: option.text,
      })),
    })),
  };
}
