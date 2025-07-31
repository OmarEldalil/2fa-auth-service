import {z} from 'zod';

export const postRegisterRequest = z.object({
    name: z.string().max(255).min(1),
    email: z.email().max(255),
    // E.164 format for phone numbers, got from ChatGPT
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
        message: "Invalid phone number format",
    }),
    // could be enhanced with a custom password strength validation (capital|small letters, numbers, special characters)
    password: z.string().min(6).max(255),
})


export type RegisterUserData = z.infer<typeof postRegisterRequest>;