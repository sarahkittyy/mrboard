import { Request, Response, NextFunction } from 'express';
import { User } from '../db/models/User';

export default function requireAuth(req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated()) {
		req.user = req.user as User;
		next();
	} else {
		return res.status(401).send('No permission');
	}
}