import express from 'express';

import requireAuth from './middleware/requireAuth';
import assert from './middleware/assert';
import { body } from 'express-validator';

import { ReportController } from './db/controllers/ReportController';

const reports = express.Router();

reports.post('/submit', [
  requireAuth(1),
  body('time').isNumeric(),
  body('reason').optional().isString(),
  assert
], ReportController.submit);

reports.get('/any', [
  requireAuth(2),
], ReportController.any);

reports.get('/', [
  requireAuth(2),
], ReportController.all); 

export default reports;
