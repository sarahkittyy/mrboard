import express, { Request, Response } from 'express';

import Level from '../models/Level';
import Time from '../models/Time';
import User from '../models/User';

export class LevelController {
  /**
   * get a specific level
   * param('id') - isNumeric - the id of the level to grab
   */
  public static get = async (req: Request, res: Response) => {
    let level = await Level.findOne({ where: { id: req.params.id } });

    if (!level) {
      return res.status(404).send(`Could not find level ${req.params.id}`);
    }

    return res.send(level);
  }

  /**
   * get a level by it's steam id
   * param('id') - isNumeric - the id of the level to grab
   */
  public static steam = async (req: Request, res: Response) => {
    let level = await Level.findOne({ where: { steam_id: req.params.id } });

    if (!level) {
      return res.status(404).send(`Could not find level /steam/${req.params.id}`);
    }

    return res.send(level);
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
    let times = await Time.findAll({ where: { levelID: req.params.id }, include: [User] });

    if (!times) {
      return res.status(404).send(`Could not find times with level id ${req.params.id}`);
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
      where: { levelID: req.params.id },
      order: [
        ['duration', 'ASC'],
      ],
      limit: parseInt(<string>req.query.n || '3'),
      include: [],
    });

    if (!times) {
      return res.status(404).send(`Could not find times with level id ${req.params.id}`);
    }

    return res.send(times);
  }
};
