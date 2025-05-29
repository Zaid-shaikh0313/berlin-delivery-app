import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(creds) {
        if (
          creds.username === process.env.ADMIN_USER &&
          creds.password === process.env.ADMIN_PASS
        ) {
          return { id: 1, name: 'Admin' };
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
