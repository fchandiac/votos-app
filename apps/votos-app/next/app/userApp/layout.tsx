import React, { ReactNode } from 'react';
import Navbar from './ui/Navbar';
import MuiApp from '@/mui/MuiApp';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <MuiApp>
      <Navbar />
      {children}
    </MuiApp>
  );
}
