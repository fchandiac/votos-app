import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { Box } from '@mui/material';
import { WebSocketProvider } from './webSocketContex'; // Asegúrate de que la ruta sea correcta

export const metadata: Metadata = {
  title: 'Votos App',
  description: 'AAdministración de resultados',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body>
          <WebSocketProvider>
            <Box
              sx={{
                mt: 10,
              }}
            >
              {children}
            </Box>
          </WebSocketProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
