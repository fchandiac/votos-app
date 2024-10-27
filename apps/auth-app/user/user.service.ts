import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from '../../libs/entities/auth/user.entity';
import { Session } from '../../libs/entities/auth/session.entity';
import { CreateUserDto } from 'apps/libs/dto/user/create-user.dto';
import * as bcrypt from 'bcrypt';
import { FindByEmailDto } from 'apps/libs/dto/user/find-by-email-dto';
import { AppGateway } from '../gateway/app.gateway';
import { ByIdDto } from 'apps/libs/dto/common/by-id.dto';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    // private appGateway: AppGateway,




  ) {}

  // Crear un nuevo usuario
  async createUser(dto: CreateUserDto): Promise<User> {
    const { name, email, password, userName, phone, id } = dto; // Desestructuramos el DTO
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // El número 10 es el número de rondas de sal
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      userName: userName,
      phone: phone,
      id: id,
    });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {

        if (error.driverError.code === 'ER_DUP_ENTRY') {
          // Código para entrada duplicada
          throw new ConflictException('El correo ya está en uso.'); // Lanza un conflicto
        }
      }
      throw error; // Lanza cualquier otro error que no esté manejado
    }
  }

  // Obtener todos los usuarios
  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['sessions'] }); // Carga las sesiones del usuario
  }

  // Encontrar un usuario por su ID
  async findUserById(dto: ByIdDto): Promise<User> {
    return this.userRepository.findOne({
      where: { id: dto.id },
      relations: ['sessions'],
    }); // Carga las sesiones del usuario
  }

  // Actualizar el estado de conexión de un usuario
  async updateOnlineStatus(userId: number, isOnline: boolean): Promise<void> {
    await this.userRepository.update(userId, {
      isOnline,
      lastConnected: isOnline ? new Date() : null,
    });
  }

  async findOneBySocketId(socketId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { socketId } });
  }

  async updateSocketId(userId: number, socketId: string): Promise<void> {
    await this.userRepository.update(userId, {
      socketId,
    });
  }

  // Soft delete de un usuario
  async softDeleteUser(userId: number): Promise<void> {
    await this.userRepository.softDelete(userId);
  }

  // Restaurar un usuario eliminado
  async restoreUser(userId: number): Promise<void> {
    await this.userRepository.restore(userId);
  }

  async findUserByMail(dto:FindByEmailDto): Promise<User | null> {

    //this.appGateway.server.emit('message', 'Hola desde el servidor');


    const { email } = dto;
    // Buscar el usuario por su correo electrónico
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }
}
