import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from './Controller';

export default class StatusGetController implements Controller {
  run(req: Request, res: Response): Promise<void> | void {
    res.status(httpStatus.OK).send();
  }
}
