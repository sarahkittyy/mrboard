import express, { Request, Response } from 'express';
import { param, body, oneOf } from 'express-validator';
import passport from 'passport';
import { v4 as uuidv4 } from 'uuid';
import appRoot from 'app-root-path';

import assert from './middleware/assert';
import requireAuth from './middleware/requireAuth';

import { TimeModel } from './db/models/Time';
import { UserModel } from './db/models/User';
import { LevelModel } from './db/models/Level';

import replayParser, { Replay } from '../util/replayParser';
import isReplayFile from './middleware/isReplayFile';

import { User } from './db/models/User';
import { UploadedFile } from 'express-fileupload';

import { getThumbnailURL } from '../util/steam';

const times = express.Router();

/**
 * get all times
 */
times.get('/', async (req, res) => {
	return res.send(await TimeModel.find({})
		.populate('level')
		.populate('author')
		.lean());
});
 
/**
 * get all of the currently authenticated user's times
 */
times.get('/me', requireAuth, async (req, res) => {
	let userId = req.user._id;
	let user = await UserModel.findOne({
		_id: userId,
	}, 'times')
	.populate('times')
	.lean();
	
	return res.send({ times: user.times ?? [] });
});
 
/**
 * get all of the provided user's times
 */
times.get('/:user', [
	param('user').isNumeric(),
	assert
], async (req: Request, res: Response) => {
	let user = await UserModel.findOne({
		_id: req.params.user
	}, 'times')
	.populate('times')
	.lean();
	
	if (!user) {
		return res.status(404).send(`Could not find user ${req.params.user}`);
	}
	
	return res.send({ times: user.times ?? [] });
});

/**
 * post a new time
 * 
 */
times.post('/new', [
	requireAuth,
	isReplayFile('rpl'),
	assert
], async (req: Request, res: Response) => {
	const rpl = req.files.rpl as UploadedFile;
	let data: Replay;
	try {
		data = replayParser(rpl.tempFilePath);
	} catch (err) {
		return res.status(400).send(`Could not parse .rpl file - ${err}`);
	}
	
	// try to find the associated level
	let level = await LevelModel.findOne({ steam_id: data.Id.toString(), name: data.Level });
	if (!level) {
		// add this level to the db
		level = new LevelModel();
		level.steam_id = data.Id.toString();
		level.name = data.Level;
		level.campaign = data.Campaign;
		try {
			level.thumbnailURL = await getThumbnailURL(data.Id.toString());
		} catch (err) {
			return res.status(500).send('Internal server error.');
		}
		level.save();
	}
	
	// save the replay file
	let filename: string = `storage/${uuidv4()}.rpl`;
	rpl.mv(filename);
	
	// create the time
	let time = new TimeModel();
	time.level = level;
	time.author = req.user;
	time.timestamp = new Date(data.Timestamp * 1000);
	time.duration = data.time;
	time.verified = false;
	time.replay = filename;
	time.save();
	
	return res.send('Success');
});

export default times;