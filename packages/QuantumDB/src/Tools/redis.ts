import { type ExtractValue } from '@quantumqa/types';
import { Redis } from 'ioredis';
import { type z } from 'zod';

import { REDIS_URL } from './env';

// Instances

export const redis = new Redis(REDIS_URL as string);

// Types

export const RedisKey = {} as const;

export type RedisKey = ExtractValue<typeof RedisKey>;

// Utils

/**
 * Returns a cache object with `get` and `set` methods.
 *
 * The `get` method will return the cached data if it exists and is valid.
 * Otherwise, it will return `null` and delete the key.
 *
 * The `set` method will store the data in Redis.
 *
 * @param key - Key to store the data in Redis.
 * @param schema - Zod schema to validate any cached data.
 */
export function cache<T>(key: string, schema: z.ZodType<T>) {
  async function get() {
    const stringifiedData = await redis.get(key);

    if (!stringifiedData) {
      return null;
    }

    const data = stringifiedData ? JSON.parse(stringifiedData) : null;

    const result = schema.safeParse(data);

    if (result.success) {
      return result.data;
    }

    await redis.del(key);

    return null;
  }

  async function set(data: T, expires?: number) {
    return expires
      ? redis.set(key, JSON.stringify(data), 'EX', expires)
      : redis.set(key, JSON.stringify(data));
  }

  return {
    get,
    set,
  };
}
