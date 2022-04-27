import NextAuth from 'next-auth/next';
import CredentialProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

import { connectToDatabase } from '../../../services/mongodb';

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: {
          type: 'email',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const { db } = await connectToDatabase();

        const user = await db
          .collection('users')
          .findOne({ email: credentials.email });
        if (!user) {
          return null;
        }

        const checkPassword = await compare(
          credentials.password,
          user.password
        );
        if (!checkPassword) {
          return null;
        }

        return {
          email: user.email,
          name: user.name,
          id: user._id.toString(),
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  session: {
    jwt: true,
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/register',
  },
});
