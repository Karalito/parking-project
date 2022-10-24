import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAccessToken, ILoginUser } from '../../../shared/interfaces/auth.interface';
import { JwtPayload } from '../../../shared/types/auth.type';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {
  }

  login(user: ILoginUser): IAccessToken {
    const { email, providerId, role } = user;
    console.log(user);
    const payload: JwtPayload = { email, providerId, role };
    console.log(payload);
    return { accessToken: this.jwtService.sign(payload) };
  }

  decodeJwt(accessToken: string): JwtPayload {
    return <JwtPayload>this.jwtService.decode(accessToken);
  }
}
