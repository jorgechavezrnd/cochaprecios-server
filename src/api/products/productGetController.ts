import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../shared/controller';
import ProductFinder from '../../modules/products/application/productFinder';

export default class ProductGetController implements Controller {
  constructor(private readonly finder: ProductFinder) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const product = await this.finder.run(id);
      if (!product) {
        res.status(httpStatus.NOT_FOUND).send({ message: 'Product not found' });
        return;
      }
      res.status(httpStatus.OK).json({
        id: product.id.value,
        name: product.name.value,
        description: product.description.value,
        categoryId: product.categoryId.value,
        imageUrl: product.imageUrl?.value,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      });
    } catch (error) {
      next(error);
    }
  }

  get reqSchema() { return []; }
}

