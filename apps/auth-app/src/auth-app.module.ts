import { Module } from '@nestjs/common';
import { AuthAppController } from './auth-app.controller';
import { AuthAppService } from './auth-app.service';
import { User } from '../../libs/entities/auth/user.entity';
import { UserModule } from '../user/user.module';
import { SessionModule } from '../session/session.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../../libs/entities/auth/session.entity';
import { AuthModule } from '../auth/auth.module';
import { envs } from 'apps/libs/config';
import { UserController } from '../user/user.controller';
import { SessionController } from '../session/session.controller';
import { AppGatewayModule } from '../gateway/app.gateway.module';
import { AppGateway } from '../gateway/app.gateway';
import { UserService } from '../user/user.service';
const seed = envs.seed;


@Module({
  imports: [
    UserModule, // Importa el módulo de usuarios
    SessionModule, // Importa el módulo de sesiones
    AuthModule, // Importa el módulo de autenticación
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.user,
      password: envs.database.password,
      database: envs.database.authDatabaseName,
      entities: [User, Session],
      synchronize: true,
      dropSchema: true,
      
    }),
    AuthAppModule,
    AppGatewayModule,
  
  ],
  controllers: [AuthAppController, UserController, SessionController],
  providers: [AuthAppService, AppGateway ], // Proporciona los servicios necesarios
})
export class AuthAppModule {}
