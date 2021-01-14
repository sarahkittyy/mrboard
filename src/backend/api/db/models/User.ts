import { Table, Column, Model, HasMany } from 'sequelize-typescript';

import Time from './Time';
import Report from './Report';

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

  @HasMany(() => Report)
  reports: Report[];

  // 0 -> not logged in
  // 1 -> logged in, normal user
  // 2 -> moderator
  // 3 -> admin
  @Column
  level: number;
};
