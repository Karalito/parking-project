//  this interceptor will be used by the custom param decoratro to fetch the current User
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { UsersService } from '../../features/users/services/users.service';
import { UserSecurityService } from '../../auth/services/user-security/user-security.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userSecurityService: UserSecurityService) {
  }

  // handler refers to the route handler
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    console.log(request.user);
    const { user } = request.session || {};
    if (user) {
      // we need to pass this down to the decorator. SO we assign the user to request because req can be retrieved inside the decorator
      request.currentUser = await this.userSecurityService.findOneByProviderId(user.providerId);
    }
    // run the actual route handler
    return handler.handle();
  }
}
