import express from 'express';

import { LevelController } from './db/controllers/LevelController';

const levels = express.Router();

levels.get('/:id', LevelController.get);

export default levels;
