import redis from "../database/redis";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, "1 m"), // Allow 10 requests per 10 seconds
    prefix: "@upstash/ratelimit",
  });

export default ratelimit;