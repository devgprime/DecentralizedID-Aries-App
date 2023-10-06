import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import config from '../config/jwtConfig';

const verifyToken = (req: Request & { userId?: number }, res: Response, next: NextFunction): Response | void => {
    const token: string | undefined = req.headers['authorization'] as string;

    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    // jwt.verify(token, config.secret, (err: Error | null, decoded: any) => {
    //     if (err) {
    //         return res.status(401).send({ message: 'Failed to authenticate token.' });
    //     }
    
    //     req.userId = decoded.id; 
    //     next();
    // });
};

export default verifyToken;
