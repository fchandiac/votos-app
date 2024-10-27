import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Place } from '../../libs/entities/tables/place.entity';
import { Table } from '../../libs/entities/tables/table.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place, Table]), // Solo si necesitas usar otros repositorios aquí
  ],
  providers: [SeedService],
    exports: [SeedService],
})
export class SeedModule {}
