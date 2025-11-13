import { Router } from 'express';
import StatusGetController from './statusGetController';

export class StatusRoutes {

  static get routes(): Router {

    const router = Router();

    const statusGetController = new StatusGetController();

    router.get('/', statusGetController.run);

    return router;

  }

}
