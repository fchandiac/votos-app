'use client';
import { Box, Grid } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { validateUser } from './actions/auth';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const user = async () => {
      try {
        //@ts-ignore
        const response = await validateUser(session.user.email);
        return response.json();
      } catch (error) {
        console.log('error', error);
      }
    };

    // setTimeOut
    setTimeout(() => {
      if (!session) {
        router.push('/sign-in');
        //@ts-ignore
      } else if (user.role === 'admin') {
        router.push('/adminApp');
      } else {
        router.push('/userApp');
      }
    }, 5000);
  }, [session]);

  return (
    <>
      <Box
        sx={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '70vh', // Ajusta según sea necesario
          px: { xs: '10vw', sm: '15vw', md: '20vw' }, // Márgenes ajustables para diferentes tamaños de pantalla
          boxSizing: 'border-box', // Asegura que el padding no afecte el ancho total
        }}
      >
        <img
          className="moving-image"
          src="https://patricioojeda.cl/media/e849ced643fc5b11a0e6a728639edce6.png"
          alt="logo"
        />
      </Box>
      <Box
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          animation: 'appearBox',
          animationDelay: '1s',
        }}
      >
        <Grid
          container
          spacing={2}
          direction={'column'}
          sx={{
            paddingLeft: { xs: '10vw', sm: '15vw', md: '35vw' },
            paddingRight: { xs: '10vw', sm: '15vw', md: '35vw' },
          }}
        ></Grid>
      </Box>

      <Box className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </Box>
    </>
  );
}
