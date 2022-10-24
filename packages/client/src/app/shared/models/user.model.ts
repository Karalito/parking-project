import { Role } from '../enums/user-roles.enum';

export class User {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  role: Role;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}
