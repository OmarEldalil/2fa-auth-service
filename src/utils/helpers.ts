import bcrypt from 'bcryptjs';

export const addDynamicProperties = (condition: any, obj: Record<string, unknown>): Record<string, unknown> => {
    if (condition) return obj;
    return {};
}

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}