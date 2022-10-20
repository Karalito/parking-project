import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { UserSecurityService } from '../services/user-security/user-security.service';
import { ConfigService } from '@nestjs/config';
import { GoogleOauthGuard } from '../guards/google-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { Public } from '../../shared/decorators/access.decorator';

@Public()
@Controller('auth')
export class AuthController {
  redirectUrl = this.configService.get<string>('LOGIN_SUCCESS_REDIRECT_URL');

  constructor(
    private authService: AuthService,
    private userSecurityService: UserSecurityService,
    private configService: ConfigService
  ) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  async googleAuth(@Req() _req?: Request): Promise<void> {}

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response<unknown, Record<string, unknown>>> {
    const { accessToken } = await this.authService.login(req.user);

    res.cookie('authorization', accessToken);
    res.redirect(this.redirectUrl);
    return res.status(200);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req: Request, @Res() res: Response): Promise<Response<unknown, Record<string, unknown>>> {
    const accessToken = req.headers['authorization'].split(' ')[1];

    const { providerId } = this.authService.decodeJwt(accessToken);
    const user = await this.userSecurityService.findOneByProviderId(providerId);

    res.send(user);
    return res.status(200);
  }
}
