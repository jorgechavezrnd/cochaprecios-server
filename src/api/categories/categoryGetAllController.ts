import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import CategoryAllFinder from '../../modules/categories/application/categoryAllFinder';
import { Controller } from '../shared/controller';

export default class CategoryGetAllController implements Controller {
  private readonly finder: CategoryAllFinder;

  constructor(finder: CategoryAllFinder) {
    this.finder = finder;
  }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await this.finder.findAll();
      res.status(httpStatus.OK).json(categories.map(c => c.toPrimitives()));
    } catch (error) {
      next(error);
    }
  }
}
