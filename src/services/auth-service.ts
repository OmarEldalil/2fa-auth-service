import {LoginCredentials} from "../request-validation/post-login";
import {UnauthorizedError} from "../errors/unauthorized";
import {getUserByPhone, validateUserPassword} from "./user-service";
import {Verify2FAData} from "../request-validation/post-verify-2fa";
import {generateJWT, verifyJWT} from "./jwt-service";
import {JWTUserPayload} from "../types/user";
import {verifyOTP} from "./otp-service";
import {handle2FAGenerationAndCommunication} from "./2fa-service";

export const login = async (loginCredentials: LoginCredentials): Promise<string> => {
    const user = await getUserByPhone(loginCredentials.phone);
    if (!user) {
        throw new UnauthorizedError("Invalid Credentials");
    }

    await validateUserPassword(loginCredentials.password, user.password);

    await handle2FAGenerationAndCommunication(user);

    // generate transient token to be used with 2FA to generate final JWT
    return generateJWT(user.id, true);
}

export const verify2FA = async (verify2FAData: Verify2FAData): Promise<string> => {
    const userToken = verifyJWT(verify2FAData.authToken) as JWTUserPayload;

    if (!userToken.mfaRequired) {
        throw new UnauthorizedError("2FA is not required for this user");
    }

    await verifyOTP(userToken.id, verify2FAData.otp)

    return generateJWT(userToken.id, false);
}