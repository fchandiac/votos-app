import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PlaceService } from './place.service';
import { Place } from '../../libs/entities/tables/place.entity';
import { CreatePlaceDto } from 'apps/libs/dto/place/create-place.dto';

@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  // Crear un nuevo lugar
  @Post('create')
  async create(
    @Body()
    dto: CreatePlaceDto,
  ): Promise<Place> {
    return await this.placeService.create(dto);
  }
  // Obtener todos los lugares
  @Get()
  async findAll(): Promise<Place[]> {
    return await this.placeService.findAll();
  }

  // Obtener un lugar por su ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Place> {
    return await this.placeService.findOne(id);
  }

  // Actualizar un lugar por su ID
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('address') address: string,
  ): Promise<Place> {
    return await this.placeService.update(id, name, address);
  }

  // Eliminar un lugar por su ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.placeService.remove(id);
  }
}
