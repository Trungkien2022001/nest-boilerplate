import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/services/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(private redisService: RedisService) {}
  async checkTokenInRedis(
    userId: number,
    accessToken: string,
  ): Promise<boolean> {
    const redisKey = `user:${userId}`;
    const result = await this.redisService.sisMember(redisKey, accessToken);
    return result === 1;
  }
}
