import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';

import Level from './Level';
import User from './User';

@Table({
	timestamps: true,
})
export default class Time extends Model {
	@ForeignKey(() => Level)
	@Column
	levelID: number;
	
	@BelongsTo(() => Level)
	level: Level;
	
	@ForeignKey(() => User)
	@Column
	authorID: number;
	@BelongsTo(() => User)
	author: User;
	
	@Column({
		allowNull: false,
	})
	timestamp: Date;
	
	@Column
	duration: number;
	
	@Column
	verified: boolean;
	
	@Column
	replay: string;
};