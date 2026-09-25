"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Idol Showdown Wiki NestJS API')
        .setDescription('Tài liệu API hệ thống tra cứu Frame Data và Glossary cho game Idol Showdown')
        .setVersion('2.0.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const PORT = process.env.PORT || 5000;
    await app.listen(PORT, '0.0.0.0');
    console.log('==================================================');
    console.log(`  NestJS API Server running on: http://localhost:${PORT}`);
    console.log(`  Swagger API Docs available at: http://localhost:${PORT}/api/docs`);
    console.log('==================================================');
}
bootstrap();
//# sourceMappingURL=main.js.map