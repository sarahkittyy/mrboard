import { prop, getModelForClass, Ref } from '@typegoose/typegoose';

import { Time } from './Time';

export class Level {
	/**
	 * steam id of the level / campaign
	 */
	@prop()
	_id: string;
	
	@prop()
	campaign?: string;
	
	@prop()
	level!: string;
	
	@prop({ ref: 'Time' })
	times: Ref<Time>[];
	
	@prop()
	version: string;
};

const LevelModel = getModelForClass(Level);
export { LevelModel };