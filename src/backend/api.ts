import express from 'express';

import auth from './api/auth';
import times from './api/times';
import reports from './api/reports';
import users from './api/users';
import levels from './api/levels';
const api = express.Router();

api.use('/auth', auth);
api.use('/times', times);
api.use('/reports', reports);
api.use('/users', users);
api.use('/levels', levels);

api.all('**', (req, res) => {
  return res.status(404).send(`${req.method} ${req.path} not found.`);
});

export default api;
