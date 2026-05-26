import {
  Request,
  Response,
  NextFunction,
} from 'express';

import jwt from 'jsonwebtoken';

import User, {
  IUser,
} from '../models/user.model';

export interface AuthRequest
  extends Request {
  user?: IUser;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader?.startsWith(
        'Bearer '
      )
    ) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });

      return;
    }

    const token =
      authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };

    const user = await User.findById(
      decoded.id
    );

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not found',
      });

      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};