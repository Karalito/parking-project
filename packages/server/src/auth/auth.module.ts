import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtOauthStrategy } from './strategies/jwt-oauth.strategy';
import { GoogleOauthStrategy } from './strategies/google-oauth.strategy';
import { RolesGuard } from './guards/roles.guard';
import { UserSecurityService } from './services/user-security/user-security.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: configService.get<number>('JWT_EXPIRES_IN')
          }
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, JwtOauthStrategy, GoogleOauthStrategy, RolesGuard, UserSecurityService],
  controllers: [AuthController],
  exports: [AuthService, UserSecurityService]
})
export class AuthModule {
}
