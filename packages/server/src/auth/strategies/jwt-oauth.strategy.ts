import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../shared/types/auth.type';

@Injectable()
export class JwtOauthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    const extractJwtFromCookie = (req): string => {
      let token = null;

      if (req && req.cookies) token = req.cookies['authorization'];
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
      passReqToCallback: true
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const { providerId, email, role } = payload;
    return { providerId, email, role };
  }
}
