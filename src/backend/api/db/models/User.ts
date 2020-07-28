import mongoose from 'mongoose';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';

import { Time } from './Time';

export class User {
	@prop()
	_id: string;

	@prop()
	name: string;
	@prop()
	avatarURL: string;
	
	@prop({ ref: 'Time' })
	times: Ref<Time>[];
	
	static async getUser(id: string) {
		return await UserModel.findById(id);
	}
};

const UserModel = getModelForClass(User);
export { UserModel };