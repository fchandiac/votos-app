import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../../libs/entities/auth/session.entity';
import { User } from '../../libs/entities/auth/user.entity';
import { UserService } from '../user/user.service';


@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
    private userService: UserService,

  ) {}

  // Crear una nueva sesión
  async createSession(userId: number, socketId: string): Promise<Session> {
    const user = await this.userService.findUserById({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const session = this.sessionRepository.create({ user, socketId });

    await this.userService.updateOnlineStatus(userId, true); // Actualiza el estado de conexión del usuario
    return this.sessionRepository.save(session);
  }

  // Obtener todas las sesiones
  async findAllSessions(): Promise<Session[]> {
    return this.sessionRepository.find({ relations: ['user'] }); // Carga los usuarios asociados
  }

  // Obtener una sesión por ID
  async findSessionById(id: number): Promise<Session> {
    return this.sessionRepository.findOne({ where: { id }, relations: ['user'] });
  }

  // Actualizar el estado de desconexión de una sesión
  async updateSessionDisconnection(sessionId: number): Promise<void> {
    await this.sessionRepository.update(sessionId, { disconnectedAt: new Date() });
  }

  // Eliminar una sesión
  async deleteSession(sessionId: number): Promise<void> {
    await this.sessionRepository.softDelete(sessionId);
  }
}
