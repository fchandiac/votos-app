'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { useSession } from 'next-auth/react';
const host = process.env.NEXT_PUBLIC_WS_HOST;


// Crear el contexto para el socket
const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const { data: session } = useSession(); // Asegúrate de obtener la sesión

  // Usar `useMemo` para evitar crear múltiples instancias de socket
  const socket = useMemo(() => {
    if (session?.user?.email) {
      const socketInstance = io(host);
      // Escuchar eventos de conexión y desconexión
      socketInstance.on('connect', () => {
        console.log('Connected to Socket.io server');
        socketInstance.emit('connection', {
          email: session.user.email,
          socketId: socketInstance.id, // Correcto acceso al ID del socket
        });
      });


      socketInstance.on('disconnection', () => {
        console.log('Disconnected from Socket.io server');
        socketInstance.emit('disconnect', {
          socketId: socketInstance.id, // Correcto acceso al ID del socket
        });
      });

      return socketInstance;
    }
    return null;
  }, [session]);

  useEffect(() => {
    // Cleanup cuando el componente se desmonta
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Hook para usar el socket.io
export const useWebSocket = () => useContext(WebSocketContext);
