import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Configure Swagger API Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Idol Showdown Wiki NestJS API')
    .setDescription('Tài liệu API hệ thống tra cứu Frame Data và Glossary cho game Idol Showdown')
    .setVersion('2.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, '0.0.0.0');

  console.log('==================================================');
  console.log(`  NestJS API Server running on: http://localhost:${PORT}`);
  console.log(`  Swagger API Docs available at: http://localhost:${PORT}/api/docs`);
  console.log('==================================================');
}
bootstrap();
