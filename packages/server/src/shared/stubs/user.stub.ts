import { User } from '../../schemas/user.schema';
import { Role } from '../enums/auth.enum';

export const userStub = (): User => {
  return {
    _id: '630f1cbfb7271286a730e3dc',
    fullName: 'Testuotojas Test',
    email: 'test@nascent-works.com',
    providerId: '8164646546565',
    avatar: '',
    role: Role.USER,
    accessToken: 'Test'
  }
}
