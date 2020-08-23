import express, { Request, Response } from 'express';

import TimeSeeder from './TimeSeeder';

const seeder = express.Router();

seeder.get('/time', async (req: Request, res: Response) => {
	await TimeSeeder();
	
	return res.send('success');
});

export default seeder;