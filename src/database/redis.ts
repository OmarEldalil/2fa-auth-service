import { createClient } from 'redis';
import {logger} from "../utils/logger";
import {REDIS_URL} from "../config/app";

const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on('error', (err) => {
  logger.error('Redis Client Error', err);
  process.exit(1);
});

export {redisClient};