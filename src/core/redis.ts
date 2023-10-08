import { createClient, SetOptions } from 'redis';
import config from './config';

const RedisClient = await (async function () {
  return await createClient({
    url: config.redisUrl,
  })
    .on('error', (err) => console.log(err))
    .connect();
})();

export const setValue = async (
  key: string,
  value: any,
  expiryInSeconds: number = 86400,
  shouldNotPreExist: boolean = true,
) => {
  await RedisClient.set(key, value, {
    EX: expiryInSeconds,
    NX: shouldNotPreExist,
  } as SetOptions);
};

export const hSetValue = async (key: string, field: string, value: any) => {
  await RedisClient.hSet(key, field, value);
};

export const getValue = async (key: string) => {
  return await RedisClient.get(key);
};

export const hGetValue = async (key: string, onlyValues: boolean = false) => {
  if (onlyValues) return await RedisClient.hVals(key);
  return await RedisClient.hGetAll(key);
};

export default RedisClient;
