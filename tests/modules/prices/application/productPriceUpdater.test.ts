import ProductPriceUpdater from '../../../../src/modules/prices/application/productPriceUpdater';
import { ProductPriceRepositoryMock } from '../__mocks__/productPriceRepositoryMock';
import { ProductPriceMother } from '../domain/productPriceMother';

describe('ProductPriceUpdater', () => {
  let repository: ProductPriceRepositoryMock;
  let updater: ProductPriceUpdater;

  beforeEach(() => {
    repository = new ProductPriceRepositoryMock();
    updater = new ProductPriceUpdater(repository);
  });

  it('should update an existing price', async () => {
    const price = ProductPriceMother.random();
    repository.whenFindByIdReturn(price);

    await updater.run({
      id: price.id.value,
      productId: price.productId.value,
      storeId: price.storeId.value,
      price: 15.7,
      currency: 'BOB',
      collectedAt: new Date('2024-08-02T00:00:00Z').toISOString(),
      source: 'app',
    });

    const updated = ProductPriceMother.create(price.id, price.productId, price.storeId, new (price.price.constructor as any)(15.7), price.currency, new (price.collectedAt.constructor as any)(new Date('2024-08-02T00:00:00Z')), new (price.source.constructor as any)('app'));
    repository.assertLastSavedPriceIs(updated);
  });
});

