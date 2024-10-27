// gateway/app.gateway.module.ts
import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';


@Module({
    imports: [], 
  providers: [AppGateway], // Se importa el AppGateway y el UserService
  exports: [AppGateway], // Exporta el AppGateway para uso en otros módulos
})
export class AppGatewayModule {}
