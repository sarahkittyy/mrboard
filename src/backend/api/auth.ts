import express, { Request, Response } from 'express';
import passport from 'passport';
import { User, UserModel } from './db/models/User';
import { Strategy as SteamStrategy } from 'passport-steam';
import requireAuth from './middleware/requireAuth';

import { AuthController } from './db/controllers/AuthController';

const auth = express.Router();

passport.serializeUser((user: User, done) => {
	return done(null, user.steam_id);
});

passport.deserializeUser((id: string, done) => {
	UserModel.getUser(id).then((user) => {
		return done(null, user);
	})
	.catch((err) => {
		return done(err, null);
	});
});

passport.use(new SteamStrategy({
	returnURL: `https://${process.env.VUE_APP_URL}:${process.env.VUE_APP_PORT}/api/auth/return`,
	realm: `https://${process.env.VUE_APP_URL}:${process.env.VUE_APP_PORT}/`,
	apiKey: process.env.STEAM_API_KEY,
}, async (identifier: string, profile: any, done: Function) => {
	let user = await UserModel.getUser(profile.id)
	if (!user) {
		user = new UserModel();
		user.steam_id = profile.id;
		user.name = profile.displayName;
		user.avatarURL = profile._json.avatarmedium;
		user.times = [];
		user.save();
	}
	return done(null, user);
}));

auth.get('/login', AuthController.login);
auth.get('/logout', AuthController.logout);
auth.get('/return', 
	passport.authenticate('steam', { failureRedirect: '/steam/login' }),
	AuthController.return
);
auth.get('/me', requireAuth, AuthController.me);

export default auth;