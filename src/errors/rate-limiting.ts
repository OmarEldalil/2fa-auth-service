import {RATE_LIMITING} from "../constants/errors";
import {BaseError} from "./base-error";

export class RateLimiting extends BaseError<string[]> {
    name = RATE_LIMITING;
    statusCode = 429;

    constructor(message: string, payload?: string[], statusCode?: number) {
        super(message);
        this.payload = payload;
        if (statusCode) {
            this.statusCode = statusCode;
        }
    }
}