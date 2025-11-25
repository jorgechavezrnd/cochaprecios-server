import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import CategoryFinder from '../../modules/categories/application/categoryFinder';
import { Controller } from '../shared/controller';

export default class CategoryGetController implements Controller {
  private readonly finder: CategoryFinder;

  constructor(finder: CategoryFinder) {
    this.finder = finder;
  }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const category = await this.finder.findById(id);
      if (!category) {
        res.status(httpStatus.NOT_FOUND).send({ message: 'Category not found' });
        return;
      }
      res.status(httpStatus.OK).json(category.toPrimitives());
    } catch (error) {
      next(error);
    }
  }
}
