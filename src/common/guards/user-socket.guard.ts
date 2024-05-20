import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_TOKEN_SECRET_KEY, ROLES_KEY } from 'src/constants';
import { UserService } from 'src/modules/user/user.service';

import { ErrorHelper, TokenHelper } from '../../helpers';

@Injectable()
export class UserSocketGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private UserService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorization = req.handshake.headers.authorization || String(req.cookies.JWT);
    const userInfo = await this.verifyAccessToken(authorization);
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    req.user = userInfo;
    req.query = req.handshake.query;

    // verify role
    if (roles) {
      const { id } = req.user;
      const user = await this.UserService.getUserById(id);
      // check if required role is in  role
      req.roles = user.roles;
      return user.roles.some((role) => roles.includes(role.code));
    }
    return true;
  }

  async verifyAccessToken(authorization: string): Promise<unknown> {
    const [bearer, accessToken] = authorization.split(' ');
    if (bearer === 'Bearer' && accessToken !== '') {
      const payload = TokenHelper.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);
      return payload;
    } else {
      ErrorHelper.UnauthorizedException('Unauthorized');
    }
  }
}
