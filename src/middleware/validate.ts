import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate =
  (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction): void => {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({
          status: false,
          msg: 'Validation failed',
          errors: result.error.flatten().fieldErrors,
        });
        return;
      }
      req.body = result.data; // overwrite with parsed + sanitized data
      next();
    };
