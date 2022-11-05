//  this interceptor will be used by the custom param decorator to fetch the current RequestUser
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { UserSecurityService } from '../../auth/services/user-security/user-security.service';
import { AuthService } from '../../auth/services/auth/auth.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userSecurityService: UserSecurityService, private authService: AuthService) {
  }

  // handler refers to the route handler
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();

    if (request.headers['authorization']) {
      const accessToken = request.headers['authorization'].split(' ')[1];

      const { providerId } = await this.authService.decodeJwt(accessToken);

      if (providerId) {
        // we need to pass this down to the decorator. SO we assign the user to request because req can be retrieved inside the decorator
        request.currentUser = await this.userSecurityService.findOneByProviderId(providerId);
      }
    }
    // run the actual route handler
    return handler.handle();
  }
}
