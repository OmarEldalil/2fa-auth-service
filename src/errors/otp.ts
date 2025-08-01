import {OTP_ERROR} from "../constants/errors";
import {BaseError} from "./base-error";

export class OTPError extends BaseError {
    name = OTP_ERROR;
    statusCode = 401;

    constructor(message: string) {
        super(message);
    }
}