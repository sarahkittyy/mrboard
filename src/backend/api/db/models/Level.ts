import { Table, Column, Model, HasMany } from 'sequelize-typescript';

import Time from './Time';

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
	
	@Column
	thumbnailURL: string;
};