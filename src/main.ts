import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseErrorInterceptor } from './interceptors/responseError.interceptor';
import { ResponseFormatInterceptor } from './interceptors/responseFormat.interceptor';
import { ValidationPipe } from './pipes/validate.pipe';
import worker from './utils/worker';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const rootPath = path.resolve(
  __dirname,
  process.env.NODE_ENV === 'development' ? '../' : '../../',
);
worker.setRootPath(rootPath);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseErrorInterceptor());
  app.useGlobalInterceptors(new ResponseFormatInterceptor());
  await app.listen(9999);
}
bootstrap();
