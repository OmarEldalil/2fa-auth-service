import {User} from "../models/user";
import {UserResponseDTO} from "../types/user";

export const toResponseDTO = (user: User): UserResponseDTO => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.created_at.toISOString(),
        updatedAt: user.updated_at.toISOString()
    }
}