import Redis, { RedisOptions } from "ioredis";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = parseInt(process.env.REDIS_PORT || "6379", 10);
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || undefined;

const redisConfig: RedisOptions = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  db: 0,
  
  retryStrategy: (times) => {
    if (times > 20) {
      console.error("Redis: Retry attempts exhausted.");
      return null; 
    }
    const delay = Math.min(times * 50, 2000);
    return delay;
  },

  connectTimeout: 10000, 
};

const redisClient = new Redis(redisConfig);

redisClient.on("connect", () => {
  console.log(`Redis connected to ${REDIS_HOST}:${REDIS_PORT}`);
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

redisClient.on("reconnecting", () => {
  console.warn("Redis reconnecting...");
});

export { redisClient };