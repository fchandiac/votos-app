import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from '../../libs/entities/auth/user.entity';
import { Session } from '../../libs/entities/auth/session.entity';




@Module({
  imports: [TypeOrmModule.forFeature([User, Session])], // Importa las entidades
  providers: [UserService], // Proveedor del servicio de usuarios
  exports: [UserService], // Exporta el servicio de usuarios
})
export class UserModule {}
