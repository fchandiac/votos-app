import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceModule } from '../place/place.module';
import { TableModule } from '../table/table.module';
import { envs } from 'apps/libs/config';
import { Table } from 'apps/libs/entities/tables/table.entity';
import { Place } from 'apps/libs/entities/tables/place.entity';
import { SeedModule } from '../seed/seed.module';
import { SeedService } from '../seed/seed.service';
const seed = envs.seed;


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Cambia a tu tipo de base de datos (mysql, postgres, etc.)
      host: envs.database.host, // Cambia al host de tu DB
      port: envs.database.port, // Cambia al puerto de tu DB
      username: envs.database.user, // Usuario de tu DB
      password: envs.database.password, // Contraseña de tu DB
      database: envs.database.tablesDatabaseName, // Nombre de tu DB
      entities: [Place, Table], // Asegúrate de importar PlaceModule para poder usar PlaceService
      synchronize: true, // Solo para desarrollo. Desactiva en producción
      dropSchema: seed, // Borra y crea las tablas en cada rein
    }),
    PlaceModule,
    TableModule,
    SeedModule,
  ],

})




export class AppModule {
  constructor(private readonly seedService: SeedService) {}
  async onModuleInit() {
    console.log('AppModule constructor');
    if (seed){
      console.log('Running seed');
      await this.seedService.run();
    }
  }
}