import NextAuth, { Session } from 'next-auth';
import authConfig from '@/auth.config';
import { io, Socket } from 'socket.io-client';
import { console } from 'inspector';
const wsHost = process.env.NEXT_PUBLIC_WS_HOST;

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  },

  trustHost: true,
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      return token;
    },
    session: async ({ session, token }) => {
      return session;
    },
    signIn: async ({ user, account, profile, email, credentials }) => {
      return true;
    },
  },
  pages: {
    signIn: '/sign-in',
  },

  events: {
    signIn: async ({ user, account }) => {},
    signOut: async (user) => {},
  },

  ...authConfig,
});
