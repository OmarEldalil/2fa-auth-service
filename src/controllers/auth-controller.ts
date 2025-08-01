import {Request, Response} from "express";
import * as userService from "../services/user-service";
import * as authService from "../services/auth-service";

export const register = async (req: Request, res: Response) => {
    const user = await userService.createUser({
        name: req.body?.name,
        email: req.body?.email,
        phone: req.body?.phone,
        password: req.body?.password,
    });

    return res.json({
        message: "User created successfully",
        user
    })
}
export const login = async (req: Request, res: Response) => {
    const transientToken = await authService.login({
        phone: req.body?.phone,
        password: req.body?.password
    });
    return res.json({
        message: "2FA is required",
        transientToken
    })
}
export const verify2FA = async (req: Request, res: Response) => {
    const {accessToken, refreshToken} = await authService.verify2FA({
        authToken: req.body?.authToken,
        otp: req.body?.otp
    });
    return res.json({
        accessToken,
        refreshToken
    })
}