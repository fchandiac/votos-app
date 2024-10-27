import { NestFactory } from '@nestjs/core';
import { AppModule } from './tables-app.module';
import { envs } from 'apps/libs/config';

import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('TablesApp');
  const port = envs.tables.port;

  const app = await NestFactory.create(AppModule);

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
  logger.log(`TablesServer started at http://localhost:${port}`);
}
bootstrap();
