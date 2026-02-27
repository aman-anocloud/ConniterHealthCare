import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // CORS – allow Next.js dev server
    app.enableCors({ origin: ['http://localhost:3000'], credentials: true });

    // Global validation
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    // Swagger
    const config = new DocumentBuilder()
        .setTitle('Conninter API')
        .setDescription('Backend API for the Conninter healthcare coordination platform')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(4000);
    console.log('🚀 Conninter API running on http://localhost:4000');
    console.log('📚 Swagger docs at  http://localhost:4000/api/docs');
}
bootstrap();
