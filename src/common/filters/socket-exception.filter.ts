import {
    ArgumentsHost,
    Catch,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch()
export class SocketExceptionFilter extends BaseWsExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): any {
        const ctx = host.switchToWs();
        const clients = ctx.getClient();
        if (exception instanceof HttpException) {
            const res = {
                success: false,
                code: HttpStatus.BAD_REQUEST,
                message: exception.message
            };
            clients.emit('error', res);
        }
        else if (exception instanceof WsException) {
            const res = {
                success: false,
                code: HttpStatus.BAD_REQUEST,
                message: exception.message
            };
            clients.emit('error', res);
        } else {
            const res = {
                success: false,
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error'
            };
            clients.emit('error', res);
        }
    }
}
