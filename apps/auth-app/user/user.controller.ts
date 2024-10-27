import { Controller, Post, Get, Param, Patch, Delete, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../libs/entities/auth/user.entity';
import { CreateUserDto } from 'apps/libs/dto/user/create-user.dto';
import { FindByEmailDto } from 'apps/libs/dto/user/find-by-email-dto';
import { ByIdDto } from 'apps/libs/dto/common/by-id.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  

  // Crear un nuevo usuario
  @Post('create')
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    const { name, email, password, userName, phone, id } = dto;
    return this.userService.createUser({ name, email, password, userName, phone, id});
}

  // Obtener todos los usuarios
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Post('/findByEmail')
  async findUserByMail(@Query() dto:FindByEmailDto): Promise<User> {
    const { email } = dto;
    return this.userService.findUserByMail({email});
  }


  @Post('/findBySocketId')
  async findUserBySocketId(@Query('socketId') socketId: string): Promise<User> {
    return this.userService.findOneBySocketId(socketId);
  }
  

  // Obtener un usuario por ID
  @Get('findOneById')
  async findUserById(@Query() dto: ByIdDto): Promise<User> {
    const { id } = dto;
    return this.userService.findUserById({ id });
  }

  // Actualizar el estado de conexión de un usuario
  @Patch(':id/online-status')
  async updateOnlineStatus(
    @Param('id') id: number,
    @Body('isOnline') isOnline: boolean,
  ): Promise<void> {
    await this.userService.updateOnlineStatus(id, isOnline);
  }

  // Soft delete de un usuario
  @Delete(':id')
  async softDeleteUser(@Param('id') id: number): Promise<void> {
    await this.userService.softDeleteUser(id);
  }

  // Restaurar un usuario eliminado
  @Patch(':id/restore')
  async restoreUser(@Param('id') id: number): Promise<void> {
    await this.userService.restoreUser(id);
  }


}
