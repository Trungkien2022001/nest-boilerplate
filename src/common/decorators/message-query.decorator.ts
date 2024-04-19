import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IUser } from '../../interfaces';

export const MessageQuery = createParamDecorator<any, any, IUser>(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    delete query.EIO;
    delete query.transport;
    return query ? query : {};
  },
);
