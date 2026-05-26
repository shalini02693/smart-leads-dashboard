import {
  Response,
  NextFunction,
} from 'express';

import { AuthRequest } from './auth.middleware';

export const authorizeRoles = (
  ...roles: string[]
) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user;

    if (
      !user ||
      !roles.includes(user.role)
    ) {
      res.status(403).json({
        success: false,
        message: 'Access denied',
      });

      return;
    }

    next();
  };
};