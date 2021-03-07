import express, {Request, Response, NextFunction} from 'express';
import { param, query } from 'express-validator';

import assert from './middleware/assert';
import requireAuth from './middleware/requireAuth';

import { LevelController } from './db/controllers/LevelController';

const actions = express.Router();
const levels = express.Router();

levels.get('/', LevelController.all);

actions.get('/', [
], LevelController.get);

actions.delete('/', [
  requireAuth(3),
], LevelController.del);

actions.get('/times', [
  assert
], LevelController.times);

actions.get('/top', [
  query('n').isInt({ gt: 0 }).optional(),
  assert
], LevelController.top);

//-----//

levels.use('/steam/:id', [
  param('id').isNumeric(),
  assert,
  LevelController.steam,
  actions,
]);

levels.use('/:id', [
  param('id').isNumeric(),
  assert,
  (req: Request, res: Response, next: NextFunction) => {
    res.locals.id = req.params.id; 
    next();
  },
  actions,
]);

export default levels;
