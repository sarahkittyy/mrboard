import mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';

export class IUser {
	@prop()
	id!: string;

	@prop()
	name: string;
	@prop()
	avatarURL: string;
	
	static async getUser(id: string) {
		return await User.findOne({ id });
	}
};

const User = getModelForClass(IUser);
export { User };