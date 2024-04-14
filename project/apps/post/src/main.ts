/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SetUpSwaggerModule } from '@project/utils';

import { PostModule } from './app/post.module';

async function bootstrap() {
  const app = await NestFactory.create(PostModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;

  SetUpSwaggerModule<PostModule>(app, 'post');

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
