import { AllowNull, Table, Column, Model, BelongsTo, ForeignKey, DataType, HasMany } from 'sequelize-typescript';

import Level from './Level';
import User from './User';
import Report from './Report';

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

  @HasMany(() => Report)
  reports: Report[];

  @Column({
    allowNull: false,
  })
  timestamp: Date;

  @Column(DataType.FLOAT)
  duration: number;

  @Column
  verified: boolean;

  @Column
  replay: string;
};
