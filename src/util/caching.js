import Redis from "ioredis";

const redis = new Redis();

redis
  .on("connect", () => {
    console.log("connected to redis");
  })
  .on("error", () => {
    console.log("redis error");
  });

export default redis;
