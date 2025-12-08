import { Request, Response, NextFunction } from 'express';
import { Controller } from '../shared/controller';
import { query } from 'express-validator';
import CommentFinder from '../../modules/comments/application/commentFinder';

export default class CommentGetController implements Controller {
  constructor(private readonly finder: CommentFinder) { }

  get reqSchema() {
    return [
      query('productId').isUUID(4),
      query('storeId').isUUID(4),
    ];
  }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { productId, storeId } = req.query as any;
      const result = await this.finder.run({ productId, storeId });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
