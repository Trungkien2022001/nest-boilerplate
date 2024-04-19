import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes';
import { HttpExceptionFilter } from './common/filters';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ENVIRONMENT, ENVS_ALLOW_DOCS, SERVER_PORT, URL_PREFIX } from './constants';
import { swaggerConfig } from './docs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  app.setBaseViewsDir('/views');
  app.setViewEngine('hbs');

  // global nest setup
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Starts listening to shutdown hooks
  app.enableShutdownHooks();

  // config
  app.setGlobalPrefix(URL_PREFIX);
  app.useWebSocketAdapter(new IoAdapter(app));
  
  // swagger
  ENVS_ALLOW_DOCS.includes(ENVIRONMENT) && swaggerConfig(app);


  await app.listen(SERVER_PORT);
  console.log(`Application is running on port ${SERVER_PORT}`);
}
bootstrap();
