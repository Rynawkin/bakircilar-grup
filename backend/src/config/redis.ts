import { createClient } from 'redis';

let redisClient: any = null;

export const connectRedis = async (): Promise<any> => {
  try {
    if (!process.env.REDIS_HOST) {
      console.log('⚠️  Redis not configured, running without cache');
      return null;
    }

    const client = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379')
      },
      password: process.env.REDIS_PASSWORD || undefined
    });

    client.on('error', () => {
      // Suppress error logs
    });
    client.on('connect', () => console.log('✅ Redis connected'));

    await client.connect();
    redisClient = client;

    return client;
  } catch (error) {
    console.log('⚠️  Redis not available, running without cache');
    return null;
  }
};

export const getRedisClient = (): any => {
  return redisClient;
};
