import { ObjectId } from 'mongodb';

export interface IUser {
  _id?: ObjectId;
  email: string;
  password: string;
}

export interface ILoginUser {
  id: string;
  email: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
