import appRoot from 'app-root-path';
import express, {Request, Response} from 'express';
import {UploadedFile} from 'express-fileupload';
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';

import replayParser, {Replay} from '../../../util/replayParser';
import {getThumbnailURL} from '../../../util/steam';
import Level from '../models/Level';
import Report from '../models/Report';
import Time from '../models/Time';
import User from '../models/User';

export class TimeController {
	/**
   * get all times
   */
	public static all = async (req: Request, res: Response) => {
		return res.send(await Time.findAll({ include: [Level, User] }));
	}

	/**
   * get all of the currently logged in user's times
   */
	public static mine = async (req: Request, res: Response) => {
		let userId = req.user.steam_id;
		let user   = await User.findOne({ where: { steam_id: userId }, include: [Time] });

		return res.send(user.times ?? []);
	}

	/**
   * get all times of a specific user
   */
	public static users = async (req: Request, res: Response) => {
		let user = await User.findOne({ attributes: ['times'], where: { id: req.params.user } });

		if (!user) {
			return res.status(404).send(`Could not find user ${req.params.user}`);
		}

		return res.send(user.times ?? []);
	}

	/**
   * get data of a specifc time
   * @ req.params.id
   */
	public static get = async (req: Request, res: Response) => {
		let time = await Time.findOne({ where: { id: req.params.id } });

		if (!time) {
			return res.status(404).send(`Could not find time ${req.params.id}`);
		}

		return res.send(time);
	}

	/**
   * download the replay file of a specific time
   * @ req.params.id
   */
	public static download = async (req: Request, res: Response) => {
		let time = await Time.findOne({ where: { id: req.params.id } });

		if (!time) {
			return res.status(404).send(`Could not find time ${req.params.id}`);
		}

		if (!fs.existsSync(appRoot.resolve(time.replay))) {
			return res.status(404).send(`Server error: Could not find replay file at ${appRoot.resolve(time.replay)}`);
		} else {
			return res.download(appRoot.resolve(time.replay));
		}
	}

	/**
   * accept this time as valid
   * param('id') - isNumeric - the id of the time to validate
   */
	public static accept = async (req: Request, res: Response) => {
		let time = await Time.findOne({ where: { id: req.params.id }, include: [Report] });
		if (!time) {
			return res.status(404).send(`Could not find time ${req.params.id}.`);
		}

		// set the time as verified
		time.verified = true;

		// close every single report of this time
		time.reports.every((r: Report, i: number) => {
			r.checked = true;
			r.save();
			return true;
		});

		time.save();

		return res.send('Success!');
	}

	/**
   * unaccept this time as valid
   * param('id') - isNumeric - the id of the time to validate
   */
	public static unaccept = async (req: Request, res: Response) => {
		let time = await Time.findOne({ where: { id: req.params.id } });
		if (!time) {
			return res.status(404).send(`Could not find time ${req.params.id}.`);
		}

		// set the time as unverified
		time.verified = false;

		time.save();

		return res.send('Success!');
	}

	/**
   * reject this time as valid
   * param('id') - isNumeric - the id of the time to invalidate
   */
	public static reject = async (req: Request, res: Response) => {
		let time = await Time.findOne({ where: { id: req.params.id }, include: [Report, Level, User] });
		if (!time) {
			return res.status(404).send(`Could not find time ${req.params.id}.`);
		}

		time.reports.forEach((r: Report) => {
			r.destroy();
		});

		time.destroy();

		return res.send('Success!');
	}

  /**
   * pin a time
   * param('id') - isNumeric - the id of the time to pin
   */
  public static pin = async (req: Request, res: Response) => {
    let time = await Time.findOne({ where: { id: req.params.id }});

    if (!time) {
      return res.status(404).send(`Could not find time ${req.params.id}`);
    }

    time.pinned = true;
    time.save();

    return res.send('Success!');
  }

  /**
   * unpin a time
   * param('id') - isNumeric - the id of the time to pin
   */
  public static unpin = async (req: Request, res: Response) => {
    let time = await Time.findOne({ where: { id: req.params.id }});

    if (!time) {
      return res.status(404).send(`Could not find time ${req.params.id}`);
    }

    time.pinned = false;
    time.save();

    return res.send('Success!');
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
		let level = await Level.findOne({ where: { steam_id: data.WorkshopId.toString(), name: data.Level } });
		if (!level) {
			// add this level to the db
			level		   = new Level();
			level.steam_id = data.WorkshopId.toString();
			level.name	   = data.Level;
			level.campaign = data.Campaign;
			try {
				level.thumbnailURL = await getThumbnailURL(data.WorkshopId.toString());
			} catch (err) {
				return res.status(500).send('Internal server error.');
			}
			await level.save();
		}

		// temporary filename for if the time gets submitted successfully
		let filename: string = `storage/${uuidv4()}.rpl`;

		// get the submitting author
		let author = await User.findOne({ where: { steam_id: req.user.steam_id } });

		// see if the time exists
		let time = await Time.findOne({ where: {
			levelID: level.id,
			authorID: author.id,
		} });
		// create the model if it doesn't exist
		if (!time) {
			time		  = new Time();
			time.levelID  = level.id;
			time.authorID = author.id;
		} else if (data.time - time.duration >= -0.001) {
			console.log(data.time);
			console.log(time.duration);
			return res.status(400).send(`This record is not faster than the previous.`);
		}
		// update to the latest, best time
		time.duration  = data.time;
		time.timestamp = new Date(data.Timestamp * 1000);
		time.verified  = false;
		time.replay	   = filename;
		time.pinned	   = false;
		time.save();

		// save the replay file
		rpl.mv(filename);

		// respond successful
		return res.send({ response: 'Success!', redirect: `/levels/${time.levelID}` });
	}
};
