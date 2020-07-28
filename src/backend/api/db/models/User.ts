import mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
	@prop()
	_id: string;

	@prop()
	name: string;
	@prop()
	avatarURL: string;
	
	static async getUser(id: string) {
		return await UserModel.findById(id);
	}
};

const UserModel = getModelForClass(User);
export { UserModel };