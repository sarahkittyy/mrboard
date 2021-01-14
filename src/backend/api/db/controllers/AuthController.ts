import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import User from '../models/User';

export class AuthController {
  /**
  * log the user in using steam openid
    */
    public static login = (req: Request, res: Response, next: NextFunction) => {
      const returnTo = req.query?.back;
      req.session.authReturnTo = returnTo;
      const auth = passport.authenticate('steam');
      auth(req, res, next);
    }

  /**
    * log the user out
    */
    public static logout = (req: Request, res: Response) => {
      req.logout();
      const back: string = req.query.back?.toString();
      return res.redirect(back ?? '/');
    }

  /**
    * return route for steam openid login
    */
    public static return = (req: Request, res: Response) => {
      const returnTo = req.session?.authReturnTo;
      if (returnTo) {
        delete req.session.authReturnTo;
        return res.redirect(returnTo);
      } else {
        return res.redirect('/');
      }
    }

  /**
    * information about the logged in user
    */
    public static me = (req: Request, res: Response) => {
      return res.send(req.user);
    }
};
