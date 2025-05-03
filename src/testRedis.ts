import { redis } from "./infrastructure/config/redis";


async function testRedis() {
  await redis.set("test-key", "hello", { ex: 60 });
  const value = await redis.get("test-key");
  console.log("Redis test value:", value);
}

testRedis();
