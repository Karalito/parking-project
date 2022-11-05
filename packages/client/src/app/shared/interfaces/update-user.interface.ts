import { Role } from '../enums/user-roles.enum';

export interface IUpdateUser {
  fullName: string;
  email: string;
  avatar: string;
  role: Role;
}
