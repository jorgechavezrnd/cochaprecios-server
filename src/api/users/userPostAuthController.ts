import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import UserAuthenticator from '../../modules/users/application/userAuthenticator';
import { Controller } from '../shared/controller';
import { body, ValidationChain } from 'express-validator';

export default class UserPostAuthController implements Controller {
  constructor(private readonly userAuthenticator: UserAuthenticator) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    try {
      const authenticatedUser = await this.userAuthenticator.run({ email, password });

      res.status(httpStatus.OK).json(authenticatedUser);
    } catch (error) {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: error instanceof Error ? error.message : 'Authentication failed',
      });
    }
  }

  get reqSchema(): ValidationChain[] {
    return [
      body('email').isEmail().withMessage('Valid email is required'),
      body('password').isString().notEmpty().withMessage('Password is required'),
    ];
  }
}
