const { AppModule } = require('./dist/app.module');
const { NestFactory } = require('@nestjs/core');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 5101);
}
bootstrap();
