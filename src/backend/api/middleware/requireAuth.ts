import { Request, Response, NextFunction } from 'express';
import { User } from '../db/models/User';

export default function requireAuth(minlevel: number = 0) {
	return (req: Request, res: Response, next: NextFunction) => {
		if (req.isAuthenticated()) {
			req.user = req.user as User;
			if (req.user.level >= minlevel) {
				return next();
			}
		}

		return res.status(401).send('No permission');
	};
}