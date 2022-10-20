import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://127.0.0.1:4200',
      'http://localhost:8080',
      'http://127.0.0.1:8080',
      'https://localhost:4200'
    ],
    credentials: true,
    exposedHeaders: ['Accept', 'authorization', 'authentication', 'Content-Type', 'If-None-Match', 'SourceType']
  });
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Parking Project')
    .setDescription('Parking Project Documentation')
    .setVersion('1.0.0')
    .addTag('Parkis')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();
