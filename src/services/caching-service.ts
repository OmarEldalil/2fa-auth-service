import {redisClient} from "../database/redis";
import {addDynamicProperties} from "../utils/helpers";

export const setKey = async (key: string, value: any, ttl?:  number): Promise<void> => {
    await redisClient.set(key, value, {
        ...addDynamicProperties(ttl, {EX: ttl})
    });
}
export const getKey = async (key: string): Promise<string | null> => {
    return await redisClient.get(key);
}

export const deleteKey = async (key: string): Promise<void> => {
    await redisClient.del(key);
}

export const incrementHashKeyField = async (key: string, field: string, value: number = 1): Promise<void> => {
    await redisClient.hIncrBy(key, field, value);
}
