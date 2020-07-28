import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

import { Level } from './Level';
import { User } from './User';

export class Time extends TimeStamps {
	@prop({ ref: 'Level' })
	level!: Ref<Level>;
	
	@prop({ ref: 'User' })
	author!: Ref<User>;
	
	@prop()
	timestamp!: Date;
	
	@prop()
	duration: number;
};

const TimeModel = getModelForClass(Time);
export { TimeModel };