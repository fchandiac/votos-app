import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from '../../libs/entities/tables/place.entity';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  providers: [PlaceService],
  controllers: [PlaceController],
})
export class PlaceModule {}
