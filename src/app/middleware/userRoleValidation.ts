import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import zodError from '../../errors/zodError';

const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
          cookies: req.cookies,
        });

        return next();
      } catch (err) {
        // zodError(err)

        next(err);
      }
    };

export default validateRequest;