import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionService } from './session.service';
import { Session } from '../../libs/entities/auth/session.entity';
import { UserService } from '../user/user.service';
import { User } from '../../libs/entities/auth/user.entity';
import { AppGatewayModule } from '../gateway/app.gateway.module';



@Module({
  imports: [TypeOrmModule.forFeature([Session, User])], // Importa las entidades
  providers: [SessionService, UserService], // Proveedor del servicio de sesiones
  exports: [SessionService], // Exporta el servicio de sesiones para usar en otros módulos
})
export class SessionModule {}
