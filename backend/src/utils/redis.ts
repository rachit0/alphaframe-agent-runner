import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export async function cacheRun(userId: string, run: any) {
  try {
    const key = `runs:${userId}`;
    await redis.lpush(key, JSON.stringify(run));
    await redis.ltrim(key, 0, 9); // Keep last 10 runs
  } catch (error) {
    console.error('Failed to cache run:', error);
  }
}