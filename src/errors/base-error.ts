
export abstract class BaseError<T = Record<string, unknown>> extends Error {
    abstract statusCode: number;
    abstract name: string;
    protected payload?: T;

    constructor(message: string, payload?: T) {
        super(message);
        this.payload = payload;
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    getPayload(): T | undefined {
        return this.payload;
    }
}