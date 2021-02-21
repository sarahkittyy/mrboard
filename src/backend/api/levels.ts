import express from 'express';
import { param, query } from 'express-validator';

import assert from './middleware/assert';

import { LevelController } from './db/controllers/LevelController';

const levels = express.Router();

levels.get('/:id', [
  param('id').isNumeric(),
  assert
], LevelController.get);

levels.get('/:id/times', [
  param('id').isNumeric(),
  assert
], LevelController.times);

levels.get('/:id/top', [
  param('id').isNumeric(),
  query('n').isInt({ gt: 0 }).optional(),
  assert
], LevelController.times);

export default levels;
