import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { Table } from '../../libs/entities/tables/table.entity'; // Importa la entidad Table
import { PlaceService } from '../place/place.service';
import { AppGateway } from '../gateway/app.gateway';





@Module({
  imports: [TypeOrmModule.forFeature([Table])], // Asegúrate de importar PlaceModule para poder usar PlaceService
  controllers: [TableController],
  providers: [TableService, AppGateway],
})
export class TableModule {}
