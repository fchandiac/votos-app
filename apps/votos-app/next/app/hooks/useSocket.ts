// Archivo: /hooks/useSocket.ts
'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';

interface AuthInfo {
    email: string;
  }

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
    const { data: session } = useSession();

  useEffect(() => {
    const socketIo = io('ws://localhost:3001', {
        transports: ['websocket'], // Forzar el uso del WebSocket para evitar transporte de polling
      });
  

    socketIo.on('connect', () => {
      console.log('Connected to WebSocket');
      console.log('Session:', session);
        socketIo.emit('connection', { email: session?.user?.email } as AuthInfo);
    });

    socketIo.on('disconnection', () => {
      console.log('Disconnected from WebSocket');
      console.log('Session:', session);
      socketIo.emit('disconnection', { email: session?.user?.email } as AuthInfo);

    });

    

    // Guardar el socket en el estado
    setSocket(socketIo);

    // Desconectar al desmontar el componente
    return () => {
      socketIo.disconnect();
    };
  }, [
    session,
  ]);

  return socket;
};

export default useSocket;
