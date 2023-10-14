import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import handleValidationError from "../../errors/validationError";
import { ZodError } from "zod";
import zodError from "../../errors/zodError";
import handleCastError from "../../errors/castError";
import { Prisma } from "@prisma/client";
import handlePrismaValidationError from "../../errors/prismaValidationError";
import handlePrismaClientKnowRequestError from "../../errors/prismaClientKnownRequestError";
import ApiError from "../../errors/apiError";
import config from "../../config";
import { IGenericErrorMessage } from "../../interfaces.ts/genericErrorMessage";

const globalErrorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages: IGenericErrorMessage[] = [];

    if (err.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    } else if (err.name instanceof ZodError) {
        const simplifiedError = zodError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    } else if (err.name === 'CastError') {
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        const simplifiedError = handlePrismaValidationError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const simplifiedError = handlePrismaClientKnowRequestError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    } else if (err instanceof ApiError) {
        statusCode = err?.statusCode
        message = err.message
        errorMessages = err?.message ? [
            {
                path: '',
                message: err?.message
            }
        ] : []
    } else if (err instanceof Error) {
        message = err?.message;
        errorMessages = err?.message
            ? [
                {
                    path: '',
                    message: err?.message
                }
            ]
            : [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.env !== 'production' ? err?.stack : undefined
    })

}

export default globalErrorHandler