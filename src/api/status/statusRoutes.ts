import { Router } from 'express';
import { getContainer } from '../shared/dependency-injection/container';

export class StatusRoutes {

  static get routes(): Router {

    const router = Router();
    const container = getContainer();
    const statusGetController = container.get('Controllers.status.StatusGetController');

    router.get('/', statusGetController.run);

    return router;

  }

}
