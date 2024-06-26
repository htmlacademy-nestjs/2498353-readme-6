import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FILES_ALIAS } from '@project/configuration';
import { setUpSwaggerModule } from '@project/swagger';
import { CheckGatewayRequestGuard } from '@project/common';
import { FileModule } from './app/file.module';

async function bootstrap() {
  const app = await NestFactory.create(FileModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  const port = configService.get(`${FILES_ALIAS}.port`);
  const appHost = configService.get(`${FILES_ALIAS}.appHost`);

  app.useGlobalGuards(new CheckGatewayRequestGuard());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  setUpSwaggerModule<FileModule>(app, 'file');

  await app.listen(port);
  Logger.log(`🚀 File is running on: http://${appHost}:${port}/${globalPrefix}`);
}

bootstrap();
