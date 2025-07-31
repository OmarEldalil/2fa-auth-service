import {UNAUTHORIZED_ERROR, VALIDATION_ERROR} from "../constants/errors";
import {BaseError} from "./BaseError";

export class UnauthorizedError extends BaseError {
    name = UNAUTHORIZED_ERROR;
    statusCode = 401;

    constructor(message: string) {
        super(message);
    }
}