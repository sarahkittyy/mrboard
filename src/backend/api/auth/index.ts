import express, { Request, Response } from 'express';
import passport from 'passport';
import { UserModel } from '../db/models/User';
import { Strategy as SteamStrategy } from 'passport-steam';

const auth = express.Router();

passport.serializeUser((user: any, done) => {
	return done(null, user._id);
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
	returnURL: `https://${process.env.VUE_APP_URL}:${process.env.VUE_APP_PORT}/api/auth/steam/return`,
	realm: `https://${process.env.VUE_APP_URL}:${process.env.VUE_APP_PORT}/`,
	apiKey: process.env.STEAM_API_KEY,
}, async (identifier: string, profile: any, done: Function) => {
	UserModel.findByIdAndUpdate(profile.id,
	{
		_id: profile.id,
		name: profile.displayName,
		avatarURL: profile._json.avatarmedium,
	}, {
		upsert: true,
		new: true,
	}).then((user) => {
		return done(null, user);
	}).catch((err) => {
		return done(err, null);
	});
}));

auth.get('/steam/login', passport.authenticate('steam', { successReturnToOrRedirect: '/' }));

auth.get('/logout', (req, res) => {
	req.logout();
	const back: string = req.query.back.toString();
	return res.redirect(back ?? '/');
})

auth.get('/steam/return', 
	passport.authenticate('steam', { failureRedirect: '/steam/login' }),
	(req: Request, res: Response) => {
		return res.redirect('/');
	});
	
auth.get('/me', (req, res) => {
	if (!req.isAuthenticated()) {
		return res.send('no');
	}
	else {
		return res.send(req.user);
	}
});

export default auth;