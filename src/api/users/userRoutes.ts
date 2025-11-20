import { Request, Response, Router } from 'express';
import UserPutController from './userPutController';
import { validateReqSchema } from '../shared/validator';
import { getContainer } from '../shared/dependency-injection/container';

export class UserRoutes {

  static get routes(): Router {

    const router = Router();

    const container = getContainer();
    const userPutController = container.get<UserPutController>('Controllers.users.UserPutController');

    router.put('/:id', userPutController.reqSchema, validateReqSchema, (req: Request, res: Response) => {
      userPutController.run(req, res);
    });

    return router;

  }

}
