import { ILoginUser, IUser } from '@/interfaces/user';
import { verifyPassword } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'text' },
      },
      async authorize(credentials?: Record<'email' | 'password', string>) {
        if (!credentials) {
          throw new Error('No credentials found!');
        }

        const client = await connectToDatabase();
        const db = client.db(process.env.DB_NAME);

        const usersCollection = db.collection('users');

        const searchUser: { email?: string } = {
          email: credentials.email,
        };
        const user = await usersCollection.findOne<IUser>(searchUser);

        if (!user) {
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error('Could not log you in!');
        }

        const userLogin: ILoginUser = {
          id: user._id!.id.toString(),
          email: user.email,
        };

        client.close();
        return userLogin;
      },
    }),
  ],
});
