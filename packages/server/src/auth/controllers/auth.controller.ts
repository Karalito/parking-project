import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { UserSecurityService } from '../services/user-security/user-security.service';
import { ConfigService } from '@nestjs/config';
import { GoogleOauthGuard } from '../guards/google-auth.guard';
import { Request, Response } from 'express';
import { Public } from '../../shared/decorators/access.decorator';
import { RequestUser } from '../../shared/decorators/user.decorator';

@Public()
@Controller('auth')
export class AuthController {
  redirectUrl = this.configService.get<string>('LOGIN_SUCCESS_REDIRECT_URL');

  constructor(
    private authService: AuthService,
    private userSecurityService: UserSecurityService,
    private configService: ConfigService
  ) {
  }

  @Get()
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  async googleAuth(@Req() _req?: Request): Promise<void> {
  }

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
  async profile(@Res() res: Response, @RequestUser() user): Promise<Response<unknown, Record<string, unknown>>> {
    const dbUser = await this.userSecurityService.findOneByProviderId(user.providerId);

    res.send(dbUser);
    return res.status(200);
  }
}
