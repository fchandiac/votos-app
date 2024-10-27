// gateway/app.gateway.module.ts
import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule} from '@nestjs/typeorm';
import { User } from '../../libs/entities/auth/user.entity';
import { Session } from '../../libs/entities/auth/session.entity';


@Module({
    imports: [TypeOrmModule.forFeature([User, Session])], 
  providers: [AppGateway, UserService], // Se importa el AppGateway y el UserService
  exports: [AppGateway], // Exporta el AppGateway para uso en otros módulos
})
export class AppGatewayModule {}
