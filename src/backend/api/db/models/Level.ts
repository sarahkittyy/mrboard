import { prop, getModelForClass, Ref } from '@typegoose/typegoose';

import { Time } from './Time';

export class Level {
	@prop()
	steam_id: string;
	
	@prop()
	name: string;
	
	@prop()
	campaign?: string;
	
	@prop({ ref: 'Time' })
	times: Ref<Time>[];
	
	@prop()
	thumbnailURL: string;
};

const LevelModel = getModelForClass(Level);
export { LevelModel };