import { Controller, Post, Get, Param, Patch, Delete, Body } from '@nestjs/common';
import { SessionService } from './session.service';
import { Session } from '../../libs/entities/auth/session.entity';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  // Crear una nueva sesión
  @Post()
  async createSession(
    @Body('userId') userId: number,
    @Body('socketId') socketId: string,
  ): Promise<Session> {
    return this.sessionService.createSession(userId, socketId);
  }

  // Obtener todas las sesiones
  @Get()
  async findAllSessions(): Promise<Session[]> {
    return this.sessionService.findAllSessions();
  }

  // Obtener una sesión por ID
  @Get(':id')
  async findSessionById(@Param('id') id: number): Promise<Session> {
    return this.sessionService.findSessionById(id);
  }

  // Actualizar el estado de desconexión de una sesión
  @Patch(':id/disconnect')
  async updateSessionDisconnection(@Param('id') id: number): Promise<void> {
    await this.sessionService.updateSessionDisconnection(id);
  }

  // Eliminar una sesión
  @Delete(':id')
  async deleteSession(@Param('id') id: number): Promise<void> {
    await this.sessionService.deleteSession(id);
  }
}
