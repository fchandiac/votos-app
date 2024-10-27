import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from '../../libs/entities/tables/place.entity';
import { CreatePlaceDto } from 'apps/libs/dto/place/create-place.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place) private placeRepository: Repository<Place>,
  ) {}

  // Crear un nuevo lugar
  async create(dto: CreatePlaceDto): Promise<Place> {
    const { name, address, userId } = dto;
    const place = this.placeRepository.create({ name, address, userId });
    return await this.placeRepository.save(place);
  }

  // Obtener todos los lugares
  async findAll(): Promise<Place[]> {
    return await this.placeRepository.find({ relations: ['tables'] });
  }

  async findAllByUser(userId: number): Promise<Place[]> {
    return await this.placeRepository.find({
      relations: ['tables'],
      where: { userId },
    });
  }

  // Obtener un lugar por su ID
  async findOne(id: number): Promise<Place> {
    const place = await this.placeRepository.findOne({
      where: { id },
      relations: ['tables'],
    });

    if (!place) {
      throw new NotFoundException(`Lugar con ID ${id} no encontrado`);
    }

    return place;
  }

  // Actualizar un lugar por su ID
  async update(id: number, name: string, address: string): Promise<Place> {
    const place = await this.findOne(id);

    place.name = name;
    place.address = address;

    return await this.placeRepository.save(place);
  }

  // Eliminar un lugar por su ID
  async remove(id: number): Promise<void> {
    const place = await this.findOne(id);
    await this.placeRepository.remove(place);
  }
}
