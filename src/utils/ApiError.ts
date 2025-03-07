import { IApiError } from "@/types/IapiError";

class ApiError extends Error implements IApiError {
    statusCode: number;
    data: null | any;
    message: string;
    success: boolean;
    errors: any[];
    stack?: string;

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: any[] = [],
        stack: string = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        }
    }
}

export { ApiError };