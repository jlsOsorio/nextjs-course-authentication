import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import { IUser } from '@/interfaces/user';
import { hashPassword } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';

export interface UserDocument {
  id?: ObjectId;
  email?: string | null;
  password?: string | null;
}

export interface JsonResponse {
  message?: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JsonResponse>
) {
  if (req.method === 'POST') {
    const data: IUser = req.body;

    const { email, password } = data;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          'Invalid input - password should also be at least 7 characters long.',
      });
      return;
    }

    const user: IUser = {
      email,
      password: await hashPassword(password),
    };

    const client = await connectToDatabase();
    const db = client.db(process.env.DB_NAME);

    const searchUser: UserDocument = {
      email,
    };

    const existingUser = await db.collection('users').findOne(searchUser);
    if (existingUser) {
      res.status(422).json({ message: 'User already exists!' });
      client.close();
      return;
    }

    const result = await db.collection('users').insertOne(user);

    res.status(201).json({
      message: 'Created  user!',
    });
    client.close();
  }
}

export default handler;
