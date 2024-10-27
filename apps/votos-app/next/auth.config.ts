import { NextAuthConfig } from 'next-auth';
import { AuthError } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


export default {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials;
      
          const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}/auth/sign-in`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'socket-id': 'frontEnd'
            },
            body: JSON.stringify({ email, password }),
          });
      
          // Verificar si la respuesta no es exitosa
          if (response.status !== 201) {
            throw new Error('Invalid credentials');
          }
      
          const user = await response.json(); // Parsear la respuesta como JSON
          return user;
        } catch (error) {
          console.log('Authorization Error:', error);
          return null;
        }
      },
      
      
    }),
  ],
} satisfies NextAuthConfig;
