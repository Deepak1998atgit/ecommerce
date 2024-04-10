import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import configKeys from '../config/configKeys';

interface AuthenticatedRequest extends Request {
  user?: any; 
}

// Middleware function to verify JWT token
export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(' ')[1]; 
    if (!accessToken) {
      return res.status(401).json({ message: 'Access token not provided' });
    }
    try {
    const decoded = jwt.verify(accessToken as string, configKeys.JWT_SECRET) as any;
        req.user = decoded;
    next();
    } catch (error) {
    return res.status(403).json({ message: 'Failed to authenticate token' });
    }
};
