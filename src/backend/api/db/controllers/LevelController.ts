import express, { Request, Response, NextFunction } from 'express';

import Level from '../models/Level';
import Time from '../models/Time';
import User from '../models/User';

export class LevelController {
  /**
   * get a specific level
   * param('id') - isNumeric - the id of the level to grab
   */
  public static get = async (req: Request, res: Response) => {
    let level = await Level.findOne({ where: { id: res.locals.id } });

    if (!level) {
      return res.status(404).send(`Could not find level ${res.locals.id}`);
    }

    return res.send(level);
  }

  /**
   * middleware to convert normal ids to steam ids
   * param('id') - isNumeric - the id of the level to grab
   */
  public static steam = async (req: Request, res: Response, next: NextFunction) => {
    let level = await Level.findOne({ where: { steam_id: req.params.id } });

    if (!level) {
      return res.status(404).send(`Could not find level /steam/${req.params.id}`);
    }

    res.locals.id = level.id;

    return next();
  }

  /**
   * get all levels
   */
  public static all = async (req: Request, res: Response) => {
    let levels = await Level.findAll({ include: [Time] });

    if (!levels) {
      return res.status(404).send(`Could not find levels.`);
    }
  
    let levels_r = levels.reduce((a, x) => ({...a, [x.id]: x}), {});

    return res.send(levels_r);
  }

  /**
   * get all times of a specific level
   * param('id') - isNumeric - the id of the level to get times from
   */
  public static times = async (req: Request, res: Response) => {
    let times = await Time.findAll({ where: { levelID: res.locals.id }, include: [User] });

    if (!times) {
      return res.status(404).send(`Could not find times with level id ${res.locals.id}`);
    }

    return res.send(times);
  }

  /**
   * get the top N times of a level
   * param('id') - isNumeric - the id of the level to get times from
   * query('n') - isNumeric - how many times to fetch
   */
  public static top = async (req: Request, res: Response) => {
    let times = await Time.findAll({
      where: { levelID: res.locals.id },
      order: [
        ['duration', 'ASC'],
      ],
      limit: parseInt(<string>req.query.n || '3'),
      include: [],
    });

    if (!times) {
      return res.status(404).send(`Could not find times with level id ${res.locals.id}`);
    }

    return res.send(times);
  }

  /**
   * delete the level
   * param('id') - isNumeric - the id of the level to delete.
   */
  public static del = async (req: Request, res: Response) => {
    await Level.destroy({
      where: { id: res.locals.id },
    });
    return res.send('Level deleted!');
  }
};
