import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { UserService } from '../user/user.service';

@WebSocketGateway({
  cors: {
    origin: ['https://mesas.one', 'https://www.mesas.one'], // Orígenes permitidos
    methods: ['GET', 'POST'],
    credentials: true, // Permitir el uso de credenciales
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private userService: UserService) {}

  async handleConnection(socket: any) {
    socket.emit('updateUser', { message: 'Conexión establecida' });
    console.log(`WS-AUTH: Cliente conectado: ${socket.id}`);

    socket.on('connection', async (data) => {
      console.log('Información de conexión recibida:', data.email);
      try {
        const user = await this.userService.findUserByMail({ email: data.email });
        if (user) {
          await this.userService.updateSocketId(user.id, socket.id);
          await this.userService.updateOnlineStatus(user.id, true);
          console.log('Usuario conectado:', user.name);

          // Emitir a todos los clientes que un usuario se ha conectado
          this.server.emit('updateUser', { message: `${user.name} se ha conectado` });
        } else {
          console.log('Usuario no encontrado para el email:', data.email);
        }
      } catch (error) {
        console.error('Error manejando la conexión:', error);
        socket.emit('error', { message: 'Error durante la conexión' });
      }
    });

    // Listener para signOut
    socket.on('signOut', async (data) => {
      console.log('Información de desconexión SignOut recibida:', data.email);
      try {
        const user = await this.userService.findUserByMail({ email: data.email });
        if (user) {
          await this.userService.updateOnlineStatus(user.id, false);
          console.log('Usuario desconectado:', user.name);

          // Emitir a todos los clientes que un usuario se ha desconectado
          this.server.emit('updateUser', { message: `${user.name} se ha desconectado` });
        } else {
          console.log('Usuario no encontrado para el email:', data.email);
        }
      } catch (error) {
        console.error('Error manejando signOut:', error);
        socket.emit('error', { message: 'Error durante la desconexión' });
      }
    });

    // Listener para desconexión
    socket.on('disconn', async (data) => {
      console.log('Información de desconexión recibida:', data.socketId);
      try {
        const user = await this.userService.findOneBySocketId(data.socketId);
        if (user) {
          await this.userService.updateOnlineStatus(user.id, false);
          console.log('Usuario desconectado:', user.name);

          // Emitir a todos los clientes que un usuario se ha desconectado
          this.server.emit('updateUser', { message: `${user.name} se ha desconectado` });
        } else {
          console.log('Usuario no encontrado para el socketId:', data.socketId);
        }
      } catch (error) {
        console.error('Error manejando la desconexión:', error);
        socket.emit('error', { message: 'Error durante la desconexión' });
      }
    });
  }

  async handleDisconnect(socket: any) {
    try {
      const user = await this.userService.findOneBySocketId(socket.id);
      if (user) {
        await this.userService.updateOnlineStatus(user.id, false);
        console.log(`wsServer: Cliente desconectado: ${socket.id} (${user.name})`);

        // Emitir a todos los clientes que un usuario se ha desconectado
        this.server.emit('updateUser', { message: `${user.name} se ha desconectado` });
      } else {
        console.log(`wsServer: Cliente desconectado: ${socket.id}`);
      }
    } catch (error) {
      console.error('Error manejando la desconexión:', error);
    }
  }
}
