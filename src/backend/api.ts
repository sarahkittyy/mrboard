import express from 'express';

import './api/db/init';

import auth from './api/auth';
import times from './api/times';
import seeder from './api/db/seeder/seeder';

const api = express.Router();

api.use('/auth', auth);
api.use('/times', times);

if (process.env.NODE_ENV === 'development') {
	api.use('/seed', seeder);
}

api.all('**', (req, res) => {
	return res.status(404).send(`${req.method} ${req.path} not found.`);
});

export default api;