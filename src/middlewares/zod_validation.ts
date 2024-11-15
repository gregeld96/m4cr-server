import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";


export function validateData(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const obj = req.method === 'GET' ? req.query : req.body;
      const parsedObj = schema.parse(obj);

      if (req.method === 'GET') {
        req.query = parsedObj
      } else {
        req.body = parsedObj
      }

      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        next({
          status: 400,
          provider: 'internal',
          code: '',
          message: error.errors[0].message,
        });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}
