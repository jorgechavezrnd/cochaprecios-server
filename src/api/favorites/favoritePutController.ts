import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../shared/controller';
import { body, param } from 'express-validator';
import FavoriteCreator from '../../modules/favorites/application/favoriteCreator';

export default class FavoritePutController implements Controller {
  constructor(private readonly creator: FavoriteCreator) { }

  get reqSchema() {
    return [
      param('id').isUUID(4),
      body('productId').isUUID(4),
      body('storeId').isUUID(4),
    ];
  }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { productId, storeId } = req.body;
      const user = (req as any).user;
      await this.creator.run({ id, productId, storeId, userId: user.id.value });
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      next(error);
    }
  }
}
