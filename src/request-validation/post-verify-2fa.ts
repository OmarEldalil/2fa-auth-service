import {z} from 'zod';

export const postVerify2FARequest = z.object({
    authToken: z.string(),
    otp: z.string().length(6),
})


export type Verify2FAData = z.infer<typeof postVerify2FARequest>;