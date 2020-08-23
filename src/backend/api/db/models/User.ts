import mongoose from 'mongoose';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';

import { Time } from './Time';

export class User {
	@prop()
	steam_id: string;
	
	@prop()
	name: string;
	@prop()
	avatarURL: string;
	
	@prop({ ref: 'Time' })
	times: Ref<Time>[];
	
	@prop({ default: 0 })
	level: number;
	
	static async getUser(id: string) {
		return await UserModel.findOne({ steam_id: id });
	}
};

const UserModel = getModelForClass(User);
export { UserModel };