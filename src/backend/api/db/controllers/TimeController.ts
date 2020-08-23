import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { TimeModel, Time } from '../models/Time';
import { UserModel } from '../models/User';
import { LevelModel } from '../models/Level';

import replayParser, { Replay } from '../../../util/replayParser';

import { getThumbnailURL } from '../../../util/steam';
import { UploadedFile } from 'express-fileupload';

export class TimeController {
	/**
	 * get all times
	 */
	public static all = async (req: Request, res: Response) => {
		return res.send(await TimeModel.find({})
			.populate('level')
			.lean());
	}
	
	/**
	 * get all of the currently logged in user's times
	 */
	public static mine = async (req: Request, res: Response) => {
		let userId = req.user.steam_id;
		let user = await UserModel.getUser(userId);
		await user.populate('times').execPopulate();
		
		return res.send(user.times ?? []);
	}
	
	/**
	 * get all times of a specific user
	 */
	public static users = async (req: Request, res: Response) => {
		let user = await UserModel.findOne({
			_id: req.params.user
		}, 'times')
		.populate('times')
		.lean();
		
		if (!user) {
			return res.status(404).send(`Could not find user ${req.params.user}`);
		}
		
		return res.send({ times: user.times ?? [] });
	}
	
	/**
	 * post a new time
	 */
	public static new = async (req: Request, res: Response) => {
		// parse the rpl file
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
		
		// get the submitting author
		let author = await UserModel.getUser(req.user.steam_id);
		
		// see if the time exists
		let time = await TimeModel.findOne({
			level: level._id,
			author: author._id,
		});
		// create the model if it doesn't exist
		if (!time) {
			time = new TimeModel();
			time.level = level;
			time.author = author;
		}
		// update to the latest, best time
		time.duration = data.time;
		time.timestamp = new Date(data.Timestamp * 1000);
		time.verified = false;
		time.replay = filename;
		time.save();
		
		// update relationships
		level.times.push(time);
		author.times.push(time);
		level.save();
		author.save();

		// respond successful
		return res.send('Success');
	}
};