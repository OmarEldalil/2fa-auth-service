import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/app";
import {UnauthorizedError} from "../errors/unauthorized";

export const generateJWT = (userId: string, mfaRequired: boolean): string => {
    return jwt.sign({id: userId, mfaRequired}, JWT_SECRET);
}

export const verifyJWT = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new UnauthorizedError("Invalid or expired token");
    }
}
