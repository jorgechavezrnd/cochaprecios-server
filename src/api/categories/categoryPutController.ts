import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import CategoryCreator from '../../modules/categories/application/categoryCreator';
import CategoryUpdater from '../../modules/categories/application/categoryUpdater';
import CategoryFinder from '../../modules/categories/application/categoryFinder';
import { Controller } from '../shared/controller';
import { body, ValidationChain } from 'express-validator';

export default class CategoryPutController implements Controller {
  private readonly creator: CategoryCreator;
  private readonly updater: CategoryUpdater;
  private readonly finder: CategoryFinder;

  constructor(creator: CategoryCreator, updater: CategoryUpdater, finder: CategoryFinder) {
    this.creator = creator;
    this.updater = updater;
    this.finder = finder;
  }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const category = await this.finder.findById(id);
      if (category) {
        await this.updater.run({ id, name, description });
        res.status(httpStatus.OK).send();
      } else {
        await this.creator.run({ id, name, description });
        res.status(httpStatus.CREATED).send();
      }
    } catch (error) {
      next(error);
    }
  }

  get reqSchema(): ValidationChain[] {
    return [
      body('name').isString().trim().notEmpty().withMessage('Name is required'),
      body('description').isString().trim().notEmpty().withMessage('Description is required'),
    ];
  }
}
