import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from '../../libs/entities/auth/user.entity';
import { Session } from '../../libs/entities/auth/session.entity';
import { AuthController } from './auth.controller';
import { SessionModule } from '../session/session.module';
import { SessionService } from '../session/session.service';
import { UserService } from '../user/user.service';






@Module({
  imports: [TypeOrmModule.forFeature([User, Session])], // Importa las entidades
  providers: [AuthService, SessionService, UserService], // Proveedores de servicios
  controllers: [AuthController], // Controlador de autenticación
})
export class AuthModule {}