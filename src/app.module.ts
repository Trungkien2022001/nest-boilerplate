import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { LanguageMiddleware } from './common/middlewares';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  
  ],
  controllers: [AppController],
  providers: [],
  // providers: [{
  //   provide: APP_INTERCEPTOR,
  //   useClass: CustomRateLimiterInterceptor,
  // }], // uncomment this line to enable rate limiter
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LanguageMiddleware).forRoutes('*');
  }
}
