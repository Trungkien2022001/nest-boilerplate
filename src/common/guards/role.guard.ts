import { APPLICATION, AUTH_MESSAGES } from 'src/constants/';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_TOKEN_SECRET_KEY, ROLES_KEY } from 'src/constants';
import { ErrorHelper, TokenHelper } from 'src/helpers';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from 'src/modules/user/user.service';
import { LocalesService } from 'src/services/i18n/i18n.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private authService: AuthService,
    private localesService: LocalesService
  ) {}

  /**
   * 1. Verify token
   * 2. Check if token exists in redis
   * 3. Verify roles
   * - Receive an array of role through metadata "ROLE_KEY" using decorator @Roles
   * - Get user info from request
   * - Check if required role array and user role array have any common value
   *
   * Usage: have to use with @Roles decorator
   * @UseGuards(RolesGuard)
   * @Roles([ERoles.SUPER_ADMIN, ERoles.HR])
   *
   * @param {ExecutionContext} context
   * @returns {Promise<boolean>}
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // verify token
    const req = context.switchToHttp().getRequest();
    const authorization = req.headers.authorization || String(req.cookies.JWT);
    const userInfo = await this.verifyAccessToken(authorization);
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    req.user = userInfo;
    // check token exists in redis
    // const tokenExists = await this.authService.checkTokenInRedis(
    //   req.user.id,
    //   authorization.split(' ')[1],
    // );

    // if (!tokenExists) {
    //   ErrorHelper.UnauthorizedException(AUTH_MESSAGES.USER_HAS_BEEN_LOGGED_OUT);
    // }
    // verify role
    if (req.user) {
      const { id } = req.user;
      const user = await this.userService.getUserById(id);

      // if (user.status === EUserStatus.INACTIVE) {
      //   ErrorHelper.UnauthorizedException(APPLICATION.UNAUTHORIZED);
      // }

      req.roles = user.roles;

      // check if required role is in user role
      return user.roles.some((role) => roles.includes(role.code));
    }

    return false;
  }

  async verifyAccessToken(authorization: string): Promise<unknown> {
    const [bearer, accessToken] = authorization.split(' ');
    if (bearer === 'Bearer' && accessToken !== '') {
      const payload = TokenHelper.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);
      return payload;
    } else {
      ErrorHelper.UnauthorizedException(this.localesService.translate(AUTH_MESSAGES.TOKEN_IS_INVALID));
    }
  }
}
