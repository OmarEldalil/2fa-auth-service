import {z} from 'zod';

export const postLoginRequest = z.object({
    phone: z.string(),
    password: z.string(),
})


export type LoginCredentials = z.infer<typeof postLoginRequest>;