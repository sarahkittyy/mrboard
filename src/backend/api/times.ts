import express from 'express';
import { param } from 'express-validator';

import assert from './middleware/assert';
import requireAuth from './middleware/requireAuth';

import isReplayFile from './middleware/isReplayFile';

import { TimeController } from './db/controllers/TimeController'; 

const times = express.Router();

times.get('/', TimeController.all);
times.get('/me', requireAuth, TimeController.mine);
times.get('/:user', [
	param('user').isNumeric(),
	assert
], TimeController.users);
times.post('/new', [
	requireAuth,
	isReplayFile('rpl'),
	assert
], TimeController.new);

export default times;