import express from 'express';
import { param, query } from 'express-validator';

import assert from './middleware/assert';
import requireAuth from './middleware/requireAuth';

import { LevelController } from './db/controllers/LevelController';

const levels = express.Router();

levels.get('/', LevelController.all);

levels.get('/steam/:id', [
  param('id').isNumeric(),
  assert
], LevelController.steam);

levels.delete('/:id', [
  requireAuth(3),
  param('id').isNumeric(),
  assert,
], LevelController.del);

levels.get('/:id/times', [
  param('id').isNumeric(),
  assert
], LevelController.times);

levels.get('/:id/top', [
  param('id').isNumeric(),
  query('n').isInt({ gt: 0 }).optional(),
  assert
], LevelController.top);

levels.get('/:id', [
  param('id').isNumeric(),
  assert
], LevelController.get);

export default levels;
