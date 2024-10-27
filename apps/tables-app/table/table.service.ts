import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { Table } from '../../libs/entities/tables/table.entity';
import { Place } from '../../libs/entities/tables/place.entity';
import { CreateTableDto } from 'apps/libs/dto/table/create-table.dto';
import { envs } from 'apps/libs/config';
import { SearchTermDto } from 'apps/libs/dto/common/search-term.dto';
import { UpdateVotesDto } from 'apps/libs/dto/table/update-votes.dto';
import { UpdateUserDto } from 'apps/libs/dto/table/update-user.dto';
import { ResetTableDto } from 'apps/libs/dto/table/reset-table.dto';
import { AppGateway } from '../gateway/app.gateway';

const numberTablesUniverse = envs.tables.numberTablesUniverse;
const numberVotesUniverse = envs.tables.numberVotesUniverse;

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table) private tableRepository: Repository<Table>,
    private appGateway: AppGateway,
  ) {}

  // Crear una nueva mesa con valores por defecto y sin usuario asociado
  async create(dto: CreateTableDto): Promise<Table> {
    const validateTable = await this.tableRepository.findOne({
      where: { number: dto.number },
    });
    if (validateTable) {
      throw new ConflictException('the table number already exists');
    }

    const table = this.tableRepository.create(dto);
    return await this.tableRepository.save(table);
  }

  async findAll(dto: SearchTermDto): Promise<Table[]> {
    const { searchTerm } = dto;
    const tables = await this.tableRepository.find({
      relations: ['place'], // Asegúrate de incluir la relación con place
      order: { updatedAt: 'DESC' }, // Ordenar por updatedAt
    });

    const lowerSerchTerm = searchTerm.toString().toLowerCase();
    const filteredTables = tables.filter((table) => {
      return (
        table.place.name.toLowerCase().includes(lowerSerchTerm) ||
        table.number.toString().includes(lowerSerchTerm)
      );
    });

    if (filteredTables.length === 0) {
      return tables;
    }
    return filteredTables;
  }

  async getTotals(): Promise<any> {
    const result = await this.tableRepository
      .createQueryBuilder('table')
      .select('COALESCE(SUM(table.ojeda), 0)', 'ojeda')
      .addSelect('COALESCE(SUM(table.castro), 0)', 'castro')
      .addSelect('COALESCE(SUM(table.abasolo), 0)', 'abasolo')
      .addSelect('COALESCE(SUM(table.blanks), 0)', 'blanks')
      .addSelect('COALESCE(SUM(table.nulls), 0)', 'nulls')
      .getRawOne();

    const tablesUniverse = numberTablesUniverse;
    const votesUniverse = numberVotesUniverse;

    const totalEmitted =
      parseInt(result.ojeda) +
      parseInt(result.castro) +
      parseInt(result.abasolo) +
      parseInt(result.blanks) +
      parseInt(result.nulls);

    const totalValidated =
      parseInt(result.ojeda) +
      parseInt(result.castro) +
      parseInt(result.abasolo) +
      parseInt(result.blanks);

    // Calcular el porcentaje de participación
    const participationPercentage =
      totalValidated && numberVotesUniverse
        ? ((totalValidated / numberVotesUniverse) * 100).toFixed(2) // Formatear a 2 decimales
        : '0';

    return {
      ojeda: parseInt(result.ojeda) || 0,
      castro: parseInt(result.castro) || 0,
      abasolo: parseInt(result.abasolo) || 0,
      blanks: parseInt(result.blanks) || 0,
      nulls: parseInt(result.nulls) || 0,
      totalEmitted: totalEmitted || 0,
      totalValidated: totalValidated || 0,
      tablesUniverse: tablesUniverse || 0,
      votesUniverse: votesUniverse || 0,
      participationPercentage: participationPercentage, // Sin parseFloat, ya es un string
    };
  }

  async findAllByUser(userId: number): Promise<Table[]> {
    return await this.tableRepository.find({
      where: { userId },
      relations: ['place'],
    });
  }

  // Obtener una mesa por su ID
  async findOne(id: number): Promise<Table> {
    return await this.tableRepository.findOne({
      where: { id },
      relations: ['place'],
    });
  }

  // Eliminar una mesa por su ID
  async remove(id: number): Promise<void> {
    const table = await this.findOne(id);
    await this.tableRepository.remove(table);
  }

  async updateVotes(dto: UpdateVotesDto): Promise<void> {
    const { id, ojeda, castro, abasolo, blanks, nulls } = dto;
    try {
      const result = await this.tableRepository.update(
        { id },
        { ojeda, castro, abasolo, blanks, nulls },
      );

      const server = this.appGateway.getServer();
      server.emit('updateTables');

 

      if (result.affected === 0) {
        throw new Error('No se encontró la mesa con el ID especificado.');
      }
    } catch (error) {
      console.error('Error al actualizar los votos:', error);
      throw new Error(
        'No se pudo actualizar los votos. Intente de nuevo más tarde.',
      );
    }
  }

  async updateUser(dto: UpdateUserDto): Promise<void> {
    const { id, userId } = dto;
    try {
      const result = await this.tableRepository.update({ id }, { userId });

      const server = this.appGateway.getServer();
      server.emit('updateTables');

      if (result.affected === 0) {
        throw new Error('No se encontró la mesa con el ID especificado.');
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw new Error(
        'No se pudo actualizar el usuario. Intente de nuevo más tarde.',
      );
    }
  }

  async resetTable(dto: ResetTableDto): Promise<void> {
    const { id } = dto;
    try {
      const result = await this.tableRepository.update(
        { id },
        { ojeda: 0, castro: 0, abasolo: 0, blanks: 0, nulls: 0 },
      );

      const server = this.appGateway.getServer();
      //server.emit('updateTables', 'Hola desde el servidor');
      server.emit('updateTables', 'Hola desde el servidor');

      if (result.affected === 0) {
        throw new Error('No se encontró la mesa con el ID especificado.');
      }
    } catch (error) {
      console.error('Error al reiniciar la mesa:', error);
      throw new Error(
        'No se pudo reiniciar la mesa. Intente de nuevo más tarde.',
      );
    }
  }
}
