import { TimeModel } from '../models/Time';
import { LevelModel } from '../models/Level';
import { UserModel } from '../models/User';

import faker from 'faker';
import fs from 'fs';
import appRoot from 'app-root-path';

export default async function TimeSeeder(n: number = 10) {
	await TimeModel.deleteMany({});
	
	let userCt = await UserModel.countDocuments();
	let levelCt = await LevelModel.countDocuments();
	
	let replays = fs.readdirSync(appRoot.resolve('storage'), { withFileTypes: true });
	
	for(let i = 0; i < n; ++i) {
		let ui = Math.floor(Math.random() * userCt);
		let li = Math.floor(Math.random() * levelCt);
		
		let level = await LevelModel.findOne().skip(li);
		let user = await UserModel.findOne().skip(ui);
		
		let filename = replays[Math.floor(Math.random() * replays.length)].name;
		
		let time = new TimeModel();
		time.level = level;
		time.author = user;
		time.timestamp = faker.date.past();
		time.duration = faker.random.number({min: 1, max: 100, precision: 2});
		time.verified = false;
		time.replay = filename;
		await time.save();
		
		level.times.push(time);
		user.times.push(time);
		level.save();
		user.save();
	}
};
