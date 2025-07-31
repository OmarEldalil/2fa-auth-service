import {Request, Response} from 'express';
import {ZodError} from "zod";
import {ValidationError} from "../errors/validation";
import {addDynamicProperties} from "../utils/helpers";
import {BaseError} from "../errors/BaseError";
import {logger} from "../utils/logger";

export const handleError = async (error: Error, req: Request, res: Response, next: Function) => {
    console.error('Error occurred:', error);

    // Set the response status code based on the error type
    if (error instanceof ValidationError) {
        res.status(error.getStatusCode()).json({message: error.message, ...addDynamicProperties(!!error.getPayload(), {payload: error?.getPayload()})});
    } else if (error instanceof BaseError) {
        res.status(error.getStatusCode()).json({message: error.message});
    } else {
        logger.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}