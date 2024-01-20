import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { JsonResponse, UserDocument } from '../auth/signup';
import { IChangePassword, IUser } from '@/interfaces/user';
import { connectToDatabase } from '@/lib/db';
import { hashPassword, verifyPassword } from '@/lib/auth';
import { authOptions } from '../auth/[...nextauth]';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JsonResponse>
) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userEmail = session.user?.email;
  const { newPassword, oldPassword }: IChangePassword = req.body;

  const client = await connectToDatabase();
  const db = client.db(process.env.DB_NAME);

  const searchUser: UserDocument = {
    email: userEmail,
  };
  const usersCollection = db.collection('users');
  const user = (await usersCollection.findOne(searchUser)) as IUser;

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordsMatch = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsMatch) {
    res.status(422).json({ message: 'Invalid password.' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  const updateUser: { password: string } = {
    password: hashedPassword,
  };
  await usersCollection.updateOne(searchUser, {
    $set: updateUser,
  });

  client.close();
  res.status(200).json({ message: 'Password updated!' });
}

export default handler;
