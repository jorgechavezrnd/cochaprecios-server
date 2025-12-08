import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../shared/controller';
import { param } from 'express-validator';
import CommentDeleter from '../../modules/comments/application/commentDeleter';

export default class CommentDeleteController implements Controller {
  constructor(private readonly deleter: CommentDeleter) { }

  get reqSchema() {
    return [param('id').isUUID(4)];
  }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const user = (req as any).user;
      await this.deleter.run({ id, userId: user.id.value });
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
