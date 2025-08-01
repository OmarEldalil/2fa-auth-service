import {RegisterUserData} from "../request-validation/post-register";
import * as userRepository from "../repositories/user-repository";
import {findUserByEmailOrPhone, findUserById, findUserByPhone, updateUserById} from "../repositories/user-repository";
import {User} from "../models/user";
import {ValidationError} from "../errors/validation";
import {hashPassword} from "../utils/helpers";
import {verifyOTP} from "./otp-service";
import bcrypt from "bcryptjs";
import {UnauthorizedError} from "../errors/unauthorized";
import {UserInformation} from "../request-validation/patch-user-information";
import {UserPasswordUpdatePayload} from "../request-validation/patch-user-password";
import {handle2FAGenerationAndCommunication} from "./2fa-service";
import * as userMapper from "../mappers/user";
import {UserResponseDTO} from "../types/user";

export const createUser = async (userData: RegisterUserData): Promise<UserResponseDTO> => {

    const user = await findUserByEmailOrPhone(userData.email, userData.phone);
    if (user) {
        throw new ValidationError("User already exists");
    }
    const hashedPassword = await hashPassword(userData.password);

    const storedUser = await userRepository.storeUser({...userData, password: hashedPassword});

    return userMapper.toResponseDTO(storedUser);
}

export const updateUserInformation = async (userId: string, userData: UserInformation): Promise<void> => {
    await updateUserById(userId, userData)
}

export const getUserById = async (id: string): Promise<User | null> => {
    return await findUserById(id);
}
export const getUserByPhone = async (phone: string): Promise<User | null> => {
    return await findUserByPhone(phone);
}

export const validateUserPassword = async (inputPassword: string, storedPassword: string, msg?: string): Promise<void> => {
    const isValidPassword = await bcrypt.compare(inputPassword, storedPassword);
    if (!isValidPassword) {
        throw new UnauthorizedError(msg ?? "Invalid Credentials");
    }
}

export const updatePasswordRequest = async (userId: string, currentPassword: string) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ValidationError("User not found");
    }

    await validateUserPassword(currentPassword, user.password, "Current password is incorrect");

    await handle2FAGenerationAndCommunication(user)
}


export const updateUserPassword = async (userId: string, payload: UserPasswordUpdatePayload): Promise<void> => {

    await verifyOTP(userId, payload.otp);

    const password = await hashPassword(payload.password);

    await updateUserById(userId, {password})
}