import { Table, Column, Model, HasMany } from 'sequelize-typescript';

import Time from './Time';
import Report from './Report';

@Table({
	timestamps: true,
})
export default class Level extends Model {
	@Column
	steam_id: string;
	
	@Column
	name: string;
	
	@Column({
		allowNull: true,
	})
	campaign: string;
	
	@HasMany(() => Time)
	times: Time[];

	@HasMany(() => Report)
	reports: Report[];
	
	@Column
	thumbnailURL: string;
};
