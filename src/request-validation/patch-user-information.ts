import {z} from 'zod';

// duplicate validation somehow, but it's not a big problem
export const patchUserInformationRequest = z.object({
    name: z.string().max(255).min(1).optional(),
    email: z.email().max(255).optional(),
}).refine((data) => data.name || data.email, {
    message: 'Either Email or Name are required to update user information',
    path: ['name'], // path of error
});

export type UserInformation = z.infer<typeof patchUserInformationRequest>;
