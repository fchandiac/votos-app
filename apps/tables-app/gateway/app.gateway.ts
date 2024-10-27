import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';


@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;


  handleConnection(socket: any) {
    console.log(`WS-tables: Cliente conectado: ${socket.id}`);

  }

  handleDisconnect(socket: any) {
 
  }

  getServer(): Server {
    return this.server;
  }
}
