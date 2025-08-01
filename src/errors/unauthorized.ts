import {UNAUTHORIZED_ERROR} from "../constants/errors";
import {BaseError} from "./base-error";

export class UnauthorizedError extends BaseError {
    name = UNAUTHORIZED_ERROR;
    statusCode = 401;

    constructor(message: string) {
        super(message);
    }
}