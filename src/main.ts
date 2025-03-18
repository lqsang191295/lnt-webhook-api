import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppLogger } from './common/app/app-logger';
// import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  const logger = new AppLogger();
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  app.useLogger(logger);
  app.use(
    cors({
      origin: 'http://localhost:3001', // 🔥 Phải trùng với FE
      credentials: true, // 🔥 Cho phép gửi & nhận cookie
    }),
  );
  // app.enableCors({
  //   credentials: true,
  // });
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3100);
}
bootstrap();
