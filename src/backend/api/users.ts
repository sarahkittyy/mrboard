import express from 'express';
import requireAuth from './middleware/requireAuth';
import { param } from 'express-validator';

import assert from './middleware/assert';

import { UserController } from './db/controllers/UserController';

const users = express.Router();

users.get('/', requireAuth(2), UserController.all);
users.get('/:id', [
  requireAuth(2),
  param('id').isNumeric(),
  assert
], UserController.get);

export default users;
