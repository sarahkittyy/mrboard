import express, { Request, Response } from 'express';

import User from '../models/User';

export class UserController {
  /**
  * get a user by the user's id
    * @ req.params.id
    */
    public static get = async (req: Request, res: Response) => {
      let user = await User.findOne({ where: { id: req.params.id }});
      if (!user) {
        return res.status(404).send(`Could not find user ${req.params.id}`);
      }

      return res.send(user);
    }

  /**
    * get all users :D
    */
    public static all = async (req: Request, res: Response) => {
      return res.send(await User.findAll());
    }
};
