import {Request, Response, NextFunction} from 'express';
import rateLimit, {ipKeyGenerator, RateLimitRequestHandler} from 'express-rate-limit';
import {RateLimiting} from "../errors/rate-limiting";
import {RateLimiterConfig} from "../types/rate-limiting";
import {DEFAULT_RATE_LIMITING_CONFIG} from "../constants/rate-limiting";

export const createRateLimiter = (config: Partial<RateLimiterConfig>): RateLimitRequestHandler => {
    const finalConfig = {...DEFAULT_RATE_LIMITING_CONFIG, ...config};

    return rateLimit({
        windowMs: finalConfig.windowMs!,
        max: finalConfig.limit!,
        standardHeaders: finalConfig.standardHeaders!,
        legacyHeaders: false,
        keyGenerator: finalConfig.keyGenerator!,
        skipSuccessfulRequests: finalConfig.skipSuccessfulRequests!,
        skipFailedRequests: finalConfig.skipFailedRequests!,
        message: {
            error: 'Rate limit exceeded',
            message: finalConfig.message!,
        },
        handler: (_req: Request, _res: Response, _next: NextFunction) => {
            throw new RateLimiting(finalConfig.message!);
        }
    });
};

export const OTPRateLimiter = createRateLimiter({
    limit: 3,
    windowMs: 5 * 60 * 1000,
    keyGenerator: (req: Request) => `otp:${ipKeyGenerator(req.headers['x-forwarded-for']?.[0] || req.ip || '')}`,
    skipFailedRequests: true
});

export const loginProcessRateLimiter = createRateLimiter({
    limit: 10,
    windowMs: 5 * 60 * 1000,
    keyGenerator: (req: Request) => `login:${ipKeyGenerator(req.headers['x-forwarded-for']?.[0] || req.ip || '')}`,
    skipSuccessfulRequests: true
});

export const registerRateLimiter = createRateLimiter({
    limit: 10,
    windowMs: 5 * 60 * 1000,
    keyGenerator: (req: Request) => `register:${ipKeyGenerator(req.headers['x-forwarded-for']?.[0] || req.ip || '')}`,
});

export const generalRateLimiter = createRateLimiter({
    limit: 100,
    windowMs: 5 * 60 * 1000,
    keyGenerator: (req: Request) => `rl:${ipKeyGenerator(req.headers['x-forwarded-for']?.[0] || req.ip || '')}`,
    skipSuccessfulRequests: true
});
