export type UserResponseDTO = {
    id: string,
    name: string,
    email: string,
    phone: string,
    createdAt: string,
    updatedAt: string
}
export type JWTUserPayload = {
    sub: string;
    mfaRequired: boolean;
}
