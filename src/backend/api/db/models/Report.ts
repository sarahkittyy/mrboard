import { Table, Model, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';

import Time from './Time';
import User from './User';
import Level from './Level';

@Table({
  timestamps: true,
})
export default class Report extends Model {
  @ForeignKey(() => Time)
  @Column
  timeID: number;

  @BelongsTo(() => Time)
  time: Time;

  @ForeignKey(() => Level)
  levelID: number;

  @BelongsTo(() => Level)
  level: Level;

  @ForeignKey(() => User)
  @Column
  userID: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    allowNull: true
  })
  reason: string;

  @Column
  checked: boolean;

  //TODO: field to check *who* validated the time
};
