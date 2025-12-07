import { Request, Response, NextFunction } from 'express';
import { Controller } from '../shared/controller';
import LikeCounter from '../../modules/likes/application/likeCounter';

export default class LikeCountController implements Controller {
  constructor(private readonly counter: LikeCounter) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { productId, storeId } = req.query as any;
      const result = await this.counter.run({ productId, storeId });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

