import { Role } from '../enums/auth.enum';

export interface ILoginUser {
  email?: string;
  providerId?: string;
  role?: Role;
}

export interface IAccessToken {
  accessToken: string;
}
