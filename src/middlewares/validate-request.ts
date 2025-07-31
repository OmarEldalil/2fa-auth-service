import {Request, Response, NextFunction} from "express";
import {ZodObject} from "zod";
import {$ZodType, $ZodTypeInternals} from "zod/v4/core";
import {ZodError} from "zod";
import {ValidationError} from "../errors/validation";

export const validateRequest = <T extends Readonly<{
    [k: string]: $ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>>;
}>>(schema: ZodObject<T>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            throw new ValidationError('Invalid Input', error.issues?.map(e => `${e.path.join('.')}: ${e.message}`))
        }
    }
}