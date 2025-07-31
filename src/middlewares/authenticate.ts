import {NextFunction, Request, Response} from "express";
import {UnauthorizedError} from "../errors/unauthorized";
import {verifyJWT} from "../services/jwt-service";
import {JWTUserPayload} from "../types/user";
import * as userService from "../services/user-service";
import {User} from "../models/user";

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        throw new UnauthorizedError("Invalid or missing authorization header");
    }
    const token = header.split(' ')?.[1];
    if (!token) {
        throw new UnauthorizedError("Token is required");
    }

    const userToken = verifyJWT(token) as JWTUserPayload;
    if (!userToken || !userToken.id) {
        throw new UnauthorizedError("Invalid or expired token");
    }
    if (userToken.mfaRequired) {
        throw new UnauthorizedError("2FA is required");
    }
    const user = await userService.getUserById(userToken.id);

    if (!user) {
        throw new UnauthorizedError("Invalid token");
    }

    req.user = user

    next();

}