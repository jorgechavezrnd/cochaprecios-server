import { Router } from 'express';
import { StatusRoutes } from './status/statusRoutes';
import { UserRoutes } from './users/userRoutes';
import { CategoryRoutes } from './categories/categoryRoutes';
import { ProductRoutes } from './products/productRoutes';
import { StoreRoutes } from './stores/storeRoutes';
import { PriceRoutes } from './prices/priceRoutes';
import { LikeRoutes } from './likes/likeRoutes';
import { CommentRoutes } from './comments/commentRoutes';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    router.use('/api/status', StatusRoutes.routes);
    router.use('/api/users', UserRoutes.routes);
    router.use('/api/categories', CategoryRoutes.routes);
    router.use('/api/products', ProductRoutes.routes);
    router.use('/api/stores', StoreRoutes.routes);
    router.use('/api/prices', PriceRoutes.routes);
    router.use('/api/likes', LikeRoutes.routes);
    router.use('/api/comments', CommentRoutes.routes);

    return router;

  }

}
