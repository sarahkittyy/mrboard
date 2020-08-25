import express from 'express';
import { param } from 'express-validator';

import assert from './middleware/assert';
import requireAuth from './middleware/requireAuth';

import isReplayFile from './middleware/isReplayFile';

import { TimeController } from './db/controllers/TimeController'; 

const times = express.Router();

times.get('/', TimeController.all);
times.get('/me', requireAuth(0), TimeController.mine);
times.get('/user/:user', [
	param('user').isNumeric(),
	assert
], TimeController.users);
times.get('/id/:id', [
	param('id').isNumeric(),
	assert
], TimeController.get);
times.get('/id/:id/download', TimeController.download);
times.post('/new', [
	requireAuth(0),
	isReplayFile('rpl'),
	assert
], TimeController.new);

export default times;