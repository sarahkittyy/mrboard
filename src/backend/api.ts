import express from 'express';

import auth from './api/auth';
import times from './api/times';
const api = express.Router();

api.use('/auth', auth);
api.use('/times', times);

api.all('**', (req, res) => {
	return res.status(404).send(`${req.method} ${req.path} not found.`);
});

export default api;