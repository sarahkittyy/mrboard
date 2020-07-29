import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import { extname } from 'path';

type middleware = (req: Request, res: Response, next: NextFunction) => any;

export default function isReplayFile(fileParam: string): middleware {
	return (req: Request, res: Response, next: NextFunction) => {
		const fileData = req.files?.[fileParam];
		if (!fileData) {
			return res.status(400).send('Missing replay submission.');
		}
		
		const { truncated, name, } = fileData as UploadedFile;
		
		if (truncated) {
			return res.status(400).send('Replay file too large! Maximum 20MB');
		}
		
		if (extname(name) !== '.rpl') {
			return res.status(400).send('Replay file too small');
		}
		
		next();
	};
};