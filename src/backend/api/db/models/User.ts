import mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';

export class IUser {
	@prop()
	openid!: string;

	@prop()
	name: string;
	@prop()
	avatarURL: string;
	
	static async getUser(id: string) {
		return await User.findOne({ openid: id });
	}
};

const User = getModelForClass(IUser);
export { User };