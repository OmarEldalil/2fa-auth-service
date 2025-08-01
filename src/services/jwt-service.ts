import jwt from "jsonwebtoken";
import {
    ACCESS_JWT_SECRET,
    ACCESS_TOKEN_EXPIRY,
    APP_URL,
    REFRESH_JWT_SECRET,
    REFRESH_TOKEN_EXPIRY
} from "../config/app";
import {UnauthorizedError} from "../errors/unauthorized";

export const generateJWT = (secret: string, userId: string, mfaRequired: boolean, expiresIn: string): string => {
    return jwt.sign({mfaRequired}, secret, {
        subject: userId,
        issuer: APP_URL,
        expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
    });
}

export const generateAccessToken = (userId: string, mfaRequired: boolean): string => {
    return generateJWT(ACCESS_JWT_SECRET, userId, mfaRequired, ACCESS_TOKEN_EXPIRY);
}

export const generateRefreshToken = (userId: string, mfaRequired: boolean): string => {
    return generateJWT(REFRESH_JWT_SECRET, userId, mfaRequired, REFRESH_TOKEN_EXPIRY);
}

export const verifyAccessJWT = (token: string) => {
    try {
        return jwt.verify(token, ACCESS_JWT_SECRET);
    } catch (error) {
        throw new UnauthorizedError("Invalid or expired token");
    }
}
