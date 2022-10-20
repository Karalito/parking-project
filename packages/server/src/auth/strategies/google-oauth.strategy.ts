import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UserSecurityService } from '../services/user-security/user-security.service';
import { User } from '../../schemas/user.schema';
import mongoose from 'mongoose';
import { Role } from '../../shared/enums/auth.enum';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService, private userSecurityService: UserSecurityService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_REDIRECT_URI'),
      scope: ['email', 'profile']
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile): Promise<User> {
    const { id, name, emails, photos } = profile;
    let user = await this.userSecurityService.findOneByProviderId(id);

    if (!user) {
      user = await this.userSecurityService.create({
        _id: new mongoose.Types.ObjectId(),
        fullName: `${name.givenName} ${name.familyName}`,
        email: emails[0].value,
        avatar: photos[0].value,
        providerId: id,
        role: Role.USER
      });
    }
    return user;
  }
}
