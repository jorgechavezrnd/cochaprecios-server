import { Request, Response, Router } from 'express';
import { UserPutController } from './userPutController';
import { UserCreator } from '../../modules/users/application/userCreator';
import { InMemoryUserRepository } from '../../modules/users/infrastructure/inMemoryUserRepository';
import { body } from 'express-validator';
import { validateReqSchema } from '../shared/validator';

export class UserRoutes {

  static get routes(): Router {

    const router = Router();

    const userPutController = new UserPutController(
      new UserCreator(
        new InMemoryUserRepository()
      )
    );

    router.put('/:id', userPutController.reqSchema, validateReqSchema, (req: Request, res: Response) => {
      userPutController.run(req, res);
    });

    return router;

  }

}
