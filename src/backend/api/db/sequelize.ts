import appRoot from 'app-root-path';
import {Sequelize} from 'sequelize-typescript';

import session from 'express-session';
declare module 'express-session' {
	export interface SessionData {
		authReturnTo: any;
	}
}

const { DB, DB_USER, DB_PASS } = process.env;

const sequelize = new Sequelize({
  database: DB,
  dialect: 'mysql',
  username: DB_USER,
  password: DB_PASS,
  models: [__dirname + '/models'],
  host: '0.0.0.0',

});

sequelize.sync({ force: false })
  .then(() => {
    console.log('sequelize synced!!');
  })
  .catch(err => {
    console.error(`error syncing sequelize - ${err}`);
  });

export default sequelize;
