import { Request, Response, NextFunction } from 'express';
import moment from 'moment';

/**
 * middleware to log requests coming in
 */
export default function log(req: Request, res: Response, next: NextFunction) {
	console.log(`[${new Date().toLocaleTimeString()}]: ${req.method} ${req.route}`);
	next();
};