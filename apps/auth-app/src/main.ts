import { NestFactory } from '@nestjs/core';
import { AuthAppModule } from './auth-app.module';
import { envs } from 'apps/libs/config';

import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('AuthApp');
  const port = envs.auth.port;

  const app = await NestFactory.create(AuthAppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000', // Permite solicitudes desde tu frontend local
      'https://hastaelfinal.cl',   // Permite solicitudes desde tu dominio en producción
      '*',
  ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type, Authorization', // Cabeceras permitidas
    credentials: true, // Permite el envío de cookies con solicitudes
  });

  

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }
  ));
  
  await app.listen(port);
  logger.log(`AuthServer started at http://localhost:${port}`);
}
bootstrap();
