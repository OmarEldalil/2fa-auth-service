import {Request} from "express";
import {RateLimiterConfig} from "../types/rate-limiting";

export const DEFAULT_RATE_LIMITING_CONFIG: RateLimiterConfig = {
    limit: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
    keyGenerator: (req: Request) => req.headers['x-forwarded-for']?.[0] || req.ip || '',
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
};
