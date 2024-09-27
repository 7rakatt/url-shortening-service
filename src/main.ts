import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(
     //whitelist => the parameters in the dto
     new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
   );
  await app.listen(5001);
}
bootstrap();
