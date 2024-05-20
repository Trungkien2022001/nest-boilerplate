import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IUser } from '../../interfaces';

export const User = createParamDecorator<any, any, IUser>(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);

export const GetRoles = createParamDecorator<any, any, string[]>(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const roles = request.roles;

    return data ? roles?.[data] : roles;
  },
);

export const GetCompanyId = createParamDecorator<any, any, number>(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const companyId = request.companyId;

    return data ? companyId?.[data] : companyId;
  },
);

export const GetLang = createParamDecorator<any, any, string>(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const lang = request.headers['x-lang'];
    return data ? lang?.[data] : lang;
  },
);
