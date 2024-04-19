import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { LanguageMiddleware } from './common/middlewares';
import { MysqlModule } from './database/mysql.module';
import { IoRedisModule } from './services/redis/redis.module';
import { LocalesModule } from './services/i18n/i18n.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MysqlModule,
    IoRedisModule,
    LocalesModule,
    AuthModule,
    UserModule,
  
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
