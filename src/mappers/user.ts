import {User} from "../models/user";
import {UserResponseDTO} from "../types/user";

export const transformUserToUserResponseDTO = (user: User): UserResponseDTO => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phone_number,
        createdAt: user.created_at.toISOString(),
        updatedAt: user.updated_at.toISOString()
    }
}