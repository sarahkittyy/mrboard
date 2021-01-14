import express, {Request, Response} from 'express';

import Report from '../models/Report';
import Time from '../models/Time';
import User from '../models/User';
import Level from '../models/Level';

export class ReportController {
  /**
  * @body('time') - int - time id
    * @body('reason') - string - optional
    */
    public static submit = async (req: Request, res: Response) => {
      let reason: string|null = req.body.reason;
      let timeID: number		= req.body.time;
      let userID: number|null = req.user?.id;

      const time = await Time.findByPk(timeID);
      if (!time) {
        return res.status(404).send(`Could not find time with id ${timeID}`);
      }
      if (time.verified) {
        return res.status(400).send(`Time has already been verified!`);
      }

      const report   = new Report();
      report.timeID  = time.id;
      report.userID  = userID;
      report.levelID = time.levelID;
      report.reason  = reason;
      report.checked = false;
      report.save();

      return res.send('Success!');
    }

  // get all reports
  public static all = async (req: Request, res: Response) => {
    return res.send(await Report.findAll({ include: [Time, User, Level] }));
  }
};
