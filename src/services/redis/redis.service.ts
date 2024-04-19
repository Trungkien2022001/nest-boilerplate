/* eslint-disable @typescript-eslint/quotes */
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

import { CommonHelper } from '../../helpers';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async setExpire(key: string, data: any): Promise<'OK'> {
    const expireTime = CommonHelper.random(1, 600);
    return this.redis.set(key, data, 'EX', expireTime);
  }

  async get(key: string): Promise<string> {
    return this.redis.get(key);
  }

  async hset(
    key: string,
    fields: string,
    value: string | number,
  ): Promise<number> {
    return this.redis.hset(key, fields, value);
  }

  async hget(key: string, fields: string): Promise<string> {
    return this.redis.hget(key, fields);
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    return this.redis.hgetall(key);
  }

  async expire(key: string, expireTime: number): Promise<number> {
    return this.redis.expire(key, expireTime);
  }

  async delete(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async ttl(key: string): Promise<number> {
    return this.redis.ttl(key);
  }

  async incr(key: string): Promise<number> {
    return this.redis.incr(key);
  }

  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }
  async addMembers(key: string, value: string): Promise<number> {
    return this.redis.sadd(key, value);
  }

  async sisMember(key: string, value: string): Promise<number> {
    return this.redis.sismember(key, value);
  }

  async zrem(key: string, value: any): Promise<number> {
    return this.redis.zrem(key, value);
  }

  async pipeLine(): Promise<any> {
    return this.redis.pipeline();
  }

}
