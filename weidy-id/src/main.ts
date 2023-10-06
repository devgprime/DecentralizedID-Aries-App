import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('WeIDY example')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('regov')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const port = process.env.PORT ? parseInt(process.env.PORT) : 8888
  await app.listen(port);
  console.log(`App runs on port ${port}`)
}
bootstrap();
