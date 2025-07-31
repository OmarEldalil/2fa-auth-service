import {z} from 'zod';

export const postUpdatePasswordRequestRequest = z.object({
    currentPassword: z.string().min(6).max(255),
})
