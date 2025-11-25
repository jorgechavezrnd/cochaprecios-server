import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import CategoryDeleter from '../../modules/categories/application/categoryDeleter';
import { Controller } from '../shared/controller';

export default class CategoryDeleteController implements Controller {
  private readonly deleter: CategoryDeleter;

  constructor(deleter: CategoryDeleter) {
    this.deleter = deleter;
  }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleter.run(id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
