import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../shared/controller';
import { body, param } from 'express-validator';
import CommentCreator from '../../modules/comments/application/commentCreator';

export default class CommentPutController implements Controller {
  constructor(private readonly creator: CommentCreator) { }

  get reqSchema() {
    return [
      param('id').isUUID(4),
      body('productId').isUUID(4),
      body('storeId').isUUID(4),
      body('content').isString().trim().isLength({ min: 1, max: 500 }),
    ];
  }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { productId, storeId, content } = req.body;
      const user = (req as any).user;
      await this.creator.run({ id, productId, storeId, userId: user.id.value, content });
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      next(error);
    }
  }
}
