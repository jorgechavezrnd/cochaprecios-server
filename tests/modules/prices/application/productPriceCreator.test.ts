import ProductPriceCreator from '../../../../src/modules/prices/application/productPriceCreator';
import { ProductPriceRepositoryMock } from '../__mocks__/productPriceRepositoryMock';
import { ProductPriceMother } from '../domain/productPriceMother';

describe('ProductPriceCreator', () => {
  let repository: ProductPriceRepositoryMock;
  let creator: ProductPriceCreator;

  beforeEach(() => {
    repository = new ProductPriceRepositoryMock();
    creator = new ProductPriceCreator(repository);
  });

  it('should create a new price', async () => {
    const price = ProductPriceMother.random();
    await creator.run({
      id: price.id.value,
      productId: price.productId.value,
      storeId: price.storeId.value,
      price: price.price.value,
      currency: price.currency.value,
      collectedAt: price.collectedAt.value.toISOString(),
      source: price.source.value,
    });
    repository.assertLastSavedPriceIs(price);
  });
});

