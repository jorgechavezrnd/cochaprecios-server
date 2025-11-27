import { Router } from 'express';
import { StatusRoutes } from './status/statusRoutes';
import { UserRoutes } from './users/userRoutes';
import { CategoryRoutes } from './categories/categoryRoutes';
import { ProductRoutes } from './products/productRoutes';
import { StoreRoutes } from './stores/storeRoutes';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    router.use('/api/status', StatusRoutes.routes);
    router.use('/api/users', UserRoutes.routes);
    router.use('/api/categories', CategoryRoutes.routes);
    router.use('/api/products', ProductRoutes.routes);
    router.use('/api/stores', StoreRoutes.routes);

    return router;

  }

}
