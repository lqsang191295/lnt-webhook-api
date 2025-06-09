"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./dist/app.module");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const app_logger_1 = require("./dist/common/app/app-logger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: [],
    });
    const logger = new app_logger_1.AppLogger();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    app.useLogger(logger);
    app.enableCors({
        origin: true,
        credentials: true,
        exposedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'X-Accel-Buffering',
            'Connection',
        ],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.use(cookieParser());
    await app.listen(process.env.PORT ?? 3100);
}
bootstrap();
//# sourceMappingURL=main.js.map