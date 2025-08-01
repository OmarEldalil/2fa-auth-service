import {Request, Response} from 'express';
import {v4 as uuid} from "uuid";
import {ValidationError} from "../errors/validation";
import {addDynamicProperties} from "../utils/helpers";
import {BaseError} from "../errors/base-error";
import {logger} from "../utils/logger";

export const handleError = async (error: Error, req: Request, res: Response, next: Function) => {

    if (error instanceof ValidationError) {
        res.status(error.getStatusCode()).json({message: error.message, ...addDynamicProperties(!!error.getPayload(), {payload: error?.getPayload()})});
    } else if (error instanceof BaseError) {
        res.status(error.getStatusCode()).json({message: error.message});
    } else {
        const requestId = uuid();
        logger.error('Unexpected occurred:', {
            headers: req.headers,
            method: req.method,
            url: req.originalUrl,
            body: req.body,
            requestId: requestId,
            message: error.message,
            ip: req.ip,
            stack: error.stack,
            userId: req.user?.id || null,
            userAgent: req.get('User-Agent'),
        });
        res.status(500).json({requestId, message: 'Internal Server Error'});
    }
}