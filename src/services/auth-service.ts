import {LoginCredentials} from "../request-validation/post-login";
import {UnauthorizedError} from "../errors/unauthorized";
import {getUserByPhone, validateUserPassword} from "./user-service";
import {Verify2FAData} from "../request-validation/post-verify-2fa";
import {generateAccessToken, generateRefreshToken, verifyAccessJWT} from "./jwt-service";
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
    return generateAccessToken(user.id, true);
}

export const verify2FA = async (verify2FAData: Verify2FAData): Promise<{
    accessToken: string,
    refreshToken: string
}> => {
    const userToken = verifyAccessJWT(verify2FAData.authToken) as JWTUserPayload;

    if (!userToken.mfaRequired) {
        throw new UnauthorizedError("2FA is not required for this user");
    }

    await verifyOTP(userToken.sub, verify2FAData.otp)

    return {
        accessToken: generateAccessToken(userToken.sub, false),
        refreshToken: generateRefreshToken(userToken.sub, false)
    }
}