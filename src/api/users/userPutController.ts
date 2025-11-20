import { Request, Response } from 'express';
import httpStatus from 'http-status';

import UserRegistrar from '../../modules/users/application/userRegistrar';
import { Controller } from '../shared/controller';
import { body, ValidationChain } from 'express-validator';

export default class UserPutController implements Controller {
  constructor(private readonly userRegistrar: UserRegistrar) {}

  async run(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const { name } = req.body;

    await this.userRegistrar.run({ id, name });

    res.status(httpStatus.CREATED).send();
  }

  get reqSchema(): ValidationChain[] {
    return [body('name').isString()];
  }
}
