import { ICreateUser, ICreateUserHashedPassword } from '@/interfaces/user';
import { hashPassword } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface JsonResponse {
  message?: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JsonResponse>
) {
  const data: ICreateUser = req.body;

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

  const user: ICreateUserHashedPassword = {
    email,
    password: hashPassword(password),
  };

  const client = await connectToDatabase();
  const db = client.db(process.env.DB_NAME);

  const result = await db.collection('users').insertOne(user);

  res.status(201).json({
    message: 'Created  user!',
  });
}

export default handler;
