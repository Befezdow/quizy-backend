import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {
  QuizDetailsDto,
  ApiError,
  QuizListDto,
  NewQuizDto,
} from './quizzes.dto';
import { QuizzesService } from './quizzes.service';
import {
  newQuizDtoToDbo,
  quizDetailsDboToDto,
  quizListDboToDto,
} from './quizzes.mapper';

@Controller('quizzes')
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}

  @Get()
  @HttpCode(200)
  async findAll(
    @Res() response: Response,
  ): Promise<Response<Array<QuizListDto> | ApiError>> {
    let rawResult;
    try {
      rawResult = await this.quizzesService.findAll();
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }

    const result = rawResult.map((elem) => quizListDboToDto(elem));

    console.log('findAll :: ', result);

    return response.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response<QuizDetailsDto | ApiError>> {
    let rawResult;
    try {
      rawResult = await this.quizzesService.find(id);
    } catch (err) {
      console.log(err);

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }

    if (rawResult !== null) {
      const result = quizDetailsDboToDto(rawResult);

      console.log('findOne :: ', result);

      return response.status(HttpStatus.OK).json(result);
    }

    return response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: 'Unknown quiz ID',
    });
  }

  @Post()
  @HttpCode(200)
  async createOne(
    @Body() newQuizDto: NewQuizDto,
    @Res() response: Response,
  ): Promise<Response<{ id: string } | ApiError>> {
    let id;
    try {
      const newQuizDbo = newQuizDtoToDbo(newQuizDto);
      id = await this.quizzesService.create(newQuizDbo);
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }

    const result = { id };

    console.log('createOne :: ', result);

    return response.status(HttpStatus.OK).json(result);
  }
}
