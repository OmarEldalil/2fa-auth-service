import {Request, Response} from "express";
import * as userService from "../services/user-service";

export const updateUserInformation = async (req: Request, res: Response) => {
    const user = await userService.updateUserInformation(
        req.user!.id,
        {
            name: req.body?.name,
            email: req.body?.email
        });
    return res.json({
        message: "User updated successfully",
    })
}

export const handlePasswordUpdateRequest = async (req: Request, res: Response) => {
    await userService.updatePasswordRequest(req.user!.id, req.body.currentPassword);
    return res.json({
        message: "OTP is sent to your phone number",
    })
}

export const updateUserPassword = async (req: Request, res: Response) => {
    await userService.updateUserPassword(
        req.user!.id,
        {
            password: req.body?.password,
            otp: req.body?.otp
        });
    return res.json({
        message: "User password updated successfully",
    })
}

export const getMeInformation = async (req: Request, res: Response) => {
    const user = userService.getMeInformation(req.user);
    return res.json({
        ...user
    })
}