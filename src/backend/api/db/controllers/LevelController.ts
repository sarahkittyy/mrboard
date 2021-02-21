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
      limit: parseInt(req.params.n || '3'),
      include: [],
    });

    if (!times) {
      return res.status(404).send(`Could not find times with level id ${req.params.id}`);
    }

    return res.send(times);
  }
};
