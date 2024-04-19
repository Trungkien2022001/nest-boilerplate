import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  I18nContext,
  I18nValidationException,
  I18nValidationExceptionFilter,
} from 'nestjs-i18n';
import { formatI18nErrors } from 'nestjs-i18n/dist/utils/util';

import { IResponse } from '../../interfaces';

@Catch()
export class HttpExceptionFilter extends I18nValidationExceptionFilter {
  catch(exception: I18nValidationException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === 500) {
      return response.status(status).json({
        success: false,
        message: 'Internal Server Error',
        errors: exception?.message ?? exception.stack,
        code: response.statusCode,
      } as IResponse);
    }

    const i18n = I18nContext.current();
    formatI18nErrors(exception.errors ?? [], i18n?.service, {
      lang: i18n?.lang,
    });
    const exceptionResponse = exception.getResponse() as any;
    const i18Error = [];
    exception.errors?.forEach((error: any) => {
      if (error.children.length > 0) {
        error.children.forEach((child: any) => {
          Object.values(child.constraints)[0] && i18Error.push(Object.values(child.constraints)[0]);
          child.children.forEach((item) => {
            item.children.forEach((item1) => {
              Object.values(item1.constraints)[0] && i18Error.push(Object.values(item1.constraints)[0]);
            });
          });
        });
      }
      if (Object.keys(error.constraints).length > 0) {
        i18Error.push(Object.values(error.constraints)[0]);
      }
    });

    response.status(status).json({
      success: false,
      message: exception.message,
      errors: i18Error.length > 0 ? i18Error : exceptionResponse,
      code: response.statusCode,
    } as IResponse);
  }
}
