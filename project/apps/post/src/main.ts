import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { setUpSwaggerModule } from '@project/swagger';
import { ConfigService } from '@nestjs/config';
import { POSTS_ALIAS } from '@project/configuration';
import { PostModule } from './app/post.module';
import { CheckGatewayRequestGuard } from '@project/common';

async function bootstrap() {
  const app = await NestFactory.create(PostModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  const port = configService.get(`${POSTS_ALIAS}.port`);

  app.useGlobalGuards(new CheckGatewayRequestGuard());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  setUpSwaggerModule<PostModule>(app, 'post');

  await app.listen(port);
  Logger.log(`🚀 Post is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
