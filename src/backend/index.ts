require('dotenv').config();

import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import appRoot from 'app-root-path';
import passport from 'passport';
import fileUpload from 'express-fileupload';

const MongoStore = connectMongo(session);

import api from './api';

import log from './log';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
	secret: process.env.SECRET,
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
	}),
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload({
	limits: {
		fileSize: 20 * 1024 * 1024,
	},
	useTempFiles: true,
	tempFileDir: '/tmp/',
}));

app.use('/assets', express.static(appRoot.resolve('assets')));
app.get('/favicon.ico', (req, res) => { res.sendFile(appRoot.resolve('assets/favicon.ico')); });

app.use(log);

app.use('/api', api);

app.get('/*', (req, res) => {
	return res.sendFile(appRoot.resolve('dist/frontend/index.html'));
});

let basePort = parseInt(process.env.BACKEND_PORT ?? '3000');

app.listen(basePort, () => {
	console.log(`listening on port ${basePort}`);
});