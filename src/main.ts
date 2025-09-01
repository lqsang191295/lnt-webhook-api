import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppLogger } from './common/app/app-logger';
import { LoggingInterceptor } from './common/app/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: [],
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
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  // app.use(
  //   cors({
  //     origin: 'http://localhost:3000', // 🔥 Phải trùng với FE
  //     credentials: true, // 🔥 Cho phép gửi & nhận cookie
  //   }),
  // );
  app.enableCors({
    // origin: ['http://localhost:3000', 'http://172.16.0.10:3004'], // Thay thế bằng domain frontend của bạn
    origin: true,
    credentials: true, // Quan trọng để cho phép cookie
    exposedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'X-Accel-Buffering',
      'Connection',
    ], // expose mấy header SSE
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.use(cookieParser());

  app.use((req, res, next) => {
    logger.log(`RequestLogger: [${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  await app.listen(process.env.PORT ?? 3100);
}
bootstrap();
