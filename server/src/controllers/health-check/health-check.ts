import { Request, Response } from 'express';

export const healthCheck = (_: Request, response: Response) => {
  response.json({
    message: 'Server is fine!',
  });
};
