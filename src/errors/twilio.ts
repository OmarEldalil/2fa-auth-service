import {TWILIO_ERROR} from "../constants/errors";
import {BaseError} from "./base-error";

export class TwilioError extends BaseError<string[]> {
    name = TWILIO_ERROR;
    statusCode = 500;

    constructor(message: string, payload?: string[], statusCode?: number) {
        super(message);
        this.payload = payload;
        if (statusCode) {
            this.statusCode = statusCode;
        }
    }
}