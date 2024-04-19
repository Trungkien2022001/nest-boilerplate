import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { APPLICATION, RATE_DURATION, RATE_POINTS } from 'src/constants';
import { ErrorHelper } from 'src/helpers';
@Injectable()
export class CustomRateLimiterInterceptor implements NestInterceptor {
  private readonly rateLimiter: RateLimiterMemory;

  constructor() {
    this.rateLimiter = new RateLimiterMemory({
      points: RATE_POINTS,
      duration: RATE_DURATION,
    });
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const xForwardedFor = request.headers['x-forwarded-for'];
    const xRemoteAddress = request.headers['x-remote-address'];
    const ip = xForwardedFor
      ? xForwardedFor.split(',')[0]
      : xRemoteAddress || request.ip;

    try {
      await this.rateLimiter.consume(ip);
    } catch (error) {
      ErrorHelper.ForbiddenException(APPLICATION.TOO_MANY_REQUEST);
    }

    return next.handle();
  }
}
