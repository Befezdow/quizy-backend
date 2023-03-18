import { Module } from '@nestjs/common';
import { QuizzesModule } from './quizes/quzzes.module';

@Module({
  imports: [QuizzesModule],
})
export class AppModule {}
