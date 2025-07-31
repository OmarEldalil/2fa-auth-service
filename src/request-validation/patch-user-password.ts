import {z} from 'zod';

export const patchUserPasswordRequest = z.object({
    password: z.string().min(6).max(255),
    otp: z.string(),
})

export type UserPasswordUpdatePayload = z.infer<typeof patchUserPasswordRequest>;