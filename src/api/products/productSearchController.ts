import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../shared/controller';
import ProductSearcher from '../../modules/products/application/productSearcher';

export default class ProductSearchController implements Controller {
  constructor(private readonly searcher: ProductSearcher) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, categoryId } = req.query as { name?: string; categoryId?: string };
      const products = await this.searcher.run({ name, categoryId });
      res.status(httpStatus.OK).json(products.map(p => ({
        id: p.id.value,
        name: p.name.value,
        description: p.description.value,
        categoryId: p.categoryId.value,
        imageUrl: p.imageUrl?.value,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      })));
    } catch (error) {
      next(error);
    }
  }

  get reqSchema() { return []; }
}

