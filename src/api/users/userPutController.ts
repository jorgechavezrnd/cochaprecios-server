import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { UserCreator } from '../../modules/users/application/userCreator';
import { Controller } from '../shared/controller';

export class UserPutController implements Controller {
  constructor(private readonly userCreator: UserCreator) {}

  async run(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const { name } = req.body;

    await this.userCreator.run({ id, name });

    res.status(httpStatus.CREATED).send();
  }
}
