import {OTP_ERROR, UNAUTHORIZED_ERROR, VALIDATION_ERROR} from "../constants/errors";
import {BaseError} from "./BaseError";

export class OTPError extends BaseError {
    name = OTP_ERROR;
    statusCode = 401;

    constructor(message: string) {
        super(message);
    }
}