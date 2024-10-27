// app/Navbar.tsx
'use client';
import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Switch,
} from '@mui/material';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

//import io from 'socket.io-client';
//const socketHost = process.env.NEXT_PUBLIC_WS_HOST_TABLES;
//const userWS = process.env.NEXT_PUBLIC_WS_HOST;
//const userWS = 'ws://localhost:9002';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  // const socket = useWebSocket();
  const { data: session } = useSession();

  // useEffect(() => {
  //   const socket = io(userWS);
  //   const handleVisibilityChange = () => {
     
  //     if (document.hidden) {
  //       console.log('Pestaña minimizada o en segundo plano');
  //       socket.emit('disconn', {
  //         socketId: socket.id, // Correcto acceso al ID del socket
  //       });

  //       // Aquí puedes pausar la actividad del WebSocket, si es necesario
  //     } else {
  //       console.log('Pestaña activa');
  //       // Aquí puedes restablecer la conexión o reanudar la actividad
  //     }
  //   };

  //   document.addEventListener('visibilitychange', handleVisibilityChange);
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  const logout = () => {
    //@ts-ignore
    // socket.emit('signOut', { email: session?.user?.email });
    signOut();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        height: '70px',
        //backgroundColor:  pathname === '/userApp/services' ? 'background.default' : '',
      }}
    >
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: 'inline-flex',
            justifyContent: 'left',
            alignItems: 'left',
            paddingTop: 2,
            paddingBottom: 2,
            boxSizing: 'border-box', // Asegura que el padding no afecte el ancho total
          }}
        >
          <img
            className="moving-soft-image"
            src="https://patricioojeda.cl/media/e849ced643fc5b11a0e6a728639edce6.png"
            alt="logo"
            width={125}
          />
        </Box>

        <Box
          sx={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 2,
            paddingBottom: 2,
            boxSizing: 'border-box', // Asegura que el padding no afecte el ancho total
          }}
        >
          <Button
            variant="text"
            onClick={() => logout()}
            sx={{
              color: 'white',
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            cerra sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
