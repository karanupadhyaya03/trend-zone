import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer <JWT_TOKEN>
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret'
    );

    req.user = decode as {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };
    next();
  } else {
    res.status(401).json({ message: 'No token' });
  }
};
