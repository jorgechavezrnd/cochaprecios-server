import { Request, Response, NextFunction } from 'express';
import { Controller } from '../shared/controller';
import FavoriteFinder from '../../modules/favorites/application/favoriteFinder';

export default class FavoriteGetController implements Controller {
  constructor(private readonly finder: FavoriteFinder) { }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = (req as any).user;
      const result = await this.finder.run({ userId: user.id.value });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
