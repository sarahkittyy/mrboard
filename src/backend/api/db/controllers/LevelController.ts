import express, { Request, Response } from 'express';

import Level from '../models/Level';

export class LevelController {
  /**
   * get a specific level
   */
  public static get = async (req: Request, res: Response) => {
    let level = await Level.findOne({ where: { id: req.params.id } });

    if (!level) {
      return res.status(404).send(`Could not find level ${req.params.id}`);
    }

    return res.send(level);
  }
};
