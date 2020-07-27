import express from 'express';

const api = express.Router();

api.get('*', (req, res) => {
	return res.send('API v1.0.0');
});

export default api;