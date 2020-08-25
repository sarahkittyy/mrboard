import { Table, Column, Model, HasMany } from 'sequelize-typescript';

import Time from './Time';

@Table({
	timestamps: true,
})
export default class User extends Model {
	@Column
	steam_id: string;
	
	@Column
	name: string;
	
	@Column
	avatarURL: string;
	
	@HasMany(() => Time)
	times: Time[];
	
	@Column
	level: number;
};