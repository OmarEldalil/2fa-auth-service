import {randomInt} from "crypto";
import {deleteKey, getKey, setKey} from "./caching-service";
import {DEFAULT_OTP_CACHE_TTL, optKey} from "../constants/cache";
import {UnauthorizedError} from "../errors/unauthorized";
import {OTPError} from "../errors/otp";

export const generateOTP = async (userId: string): Promise<string> => {
    const otp = randomInt(100000, 999999).toString();

    await setKey(optKey(userId), otp, DEFAULT_OTP_CACHE_TTL);

    return otp;
}

export const verifyOTP = async (userId: string, receivedOTP: string) => {
    const otp = await getKey(optKey(userId));
    if (!otp) {
        throw new OTPError("2FA OTP has expired");
    }
    if (otp !== receivedOTP) {
        throw new OTPError("Invalid OTP");
    }

    await deleteKey(optKey(userId));
}