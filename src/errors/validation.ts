import {VALIDATION_ERROR} from "../constants/errors";
import {BaseError} from "./BaseError";

export class ValidationError extends BaseError<string[]> {
    name = VALIDATION_ERROR;
    statusCode = 400;

    constructor(message: string, payload?: string[], statusCode?: number) {
        super(message);
        this.payload = payload;
        if (statusCode) {
            this.statusCode = statusCode;
        }
    }
}