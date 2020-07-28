import express from 'express';

import './db/init';

import auth from './auth';

const api = express.Router();

api.use('/auth', auth)

api.get('**', (req, res) => {
	return res.send('API v1.0.0');
});

export default api;