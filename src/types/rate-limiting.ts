import {Request} from "express";

export type RateLimiterConfig = {
    limit: number;
    windowMs: number;
    keyGenerator: (req: Request) => string;
    skipSuccessfulRequests: boolean;
    skipFailedRequests: boolean;
    message: string;
    standardHeaders: boolean;
}
