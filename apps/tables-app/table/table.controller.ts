import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { TableService } from './table.service';
import { Table } from '../../libs/entities/tables/table.entity';
import { CreateTableDto } from 'apps/libs/dto/table/create-table.dto';
import { SearchTermDto } from 'apps/libs/dto/common/search-term.dto';
import { UpdateVotesDto } from '../../libs/dto/table/update-votes.dto';
import { UpdateUserDto } from '../../libs/dto/table/update-user.dto';
import { ResetTableDto } from '../../libs/dto/table/reset-table.dto';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  // Crear una nueva mesa con valores por defecto
  @Post('create')
  async create(@Body() dto: CreateTableDto): Promise<Table> {
    return await this.tableService.create(dto);
  }

  // Obtener todas las mesas
  @Get()
  async findAll(@Query() dto: SearchTermDto): Promise<Table[]> {
    const { searchTerm } = dto;
    //console.log('searchTerm', searchTerm);
    return await this.tableService.findAll({ searchTerm });
  }

  @Get('totals')
  async findTotals(): Promise<any> {
    const result = await this.tableService.getTotals();
    return result;
  }

  @Get('findAllByUser')
  async findAllByUser(@Query('userId') userId: number): Promise<Table[]> {
    return await this.tableService.findAllByUser(userId);
  }

  @Post('updateVotes')
  async updateVotes(@Body() dto: UpdateVotesDto): Promise<any> {
    try {
      const table = await this.tableService.updateVotes(dto);
      return { result: true };
    } catch (e) {
      return { result: false };
    }
  }

  // async updateUser(dto: UpdateUserDto): 

  @Post('updateUser')
  async updateUser(@Body() dto: UpdateUserDto): Promise<any> {
    try {
      const table = await this.tableService.updateUser(dto);
      return { result: true };
    } catch (e) {
      return { result: false };
    }
  }

  @Post('resetTable')
  async resetTable(@Body() dto: ResetTableDto): Promise<any> {
    try {
      const table = await this.tableService.resetTable(dto);
      return { result: true };
    } catch (e) {
      return { result: false };
    }
  }

  // Obtener una mesa por su ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Table> {
    return await this.tableService.findOne(id);
  }

  // Eliminar una mesa por su ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.tableService.remove(id);
  }
}
