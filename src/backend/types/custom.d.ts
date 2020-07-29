import { Express } from 'express-serve-static-core';
import { User as UserModel } from '../api/db/models/User';

declare module 'express-serve-static-core' {
	interface Request {
		user?: UserModel;
	}
}