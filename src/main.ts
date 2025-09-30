import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 5005;
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"]
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Donate Service project')
    .setDescription('The donate service API description')
    .setVersion('v1')
    .addTag('Nest, bcrypt, swagger, validation')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(PORT ?? 5005, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
    console.log(`Swagger started at: http://localhost:${PORT}/api/docs`);
  });
}
start();
