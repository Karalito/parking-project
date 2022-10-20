import { Role } from '../enums/auth.enum';

export type JwtPayload = { providerId: string, email: string, role: Role }
