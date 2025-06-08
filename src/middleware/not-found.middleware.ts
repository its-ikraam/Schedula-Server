import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    status: 'error',
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.url}`,
    suggestion: 'Please check the API documentation for valid routes',
  });
};
