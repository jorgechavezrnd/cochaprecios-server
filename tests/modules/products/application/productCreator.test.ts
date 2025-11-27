import ProductCreator from '../../../../src/modules/products/application/productCreator';
import { ProductRepositoryMock } from '../__mocks__/productRepositoryMock';
import { ProductMother } from '../domain/productMother';

describe('ProductCreator', () => {
  let repository: ProductRepositoryMock;
  let creator: ProductCreator;

  beforeEach(() => {
    repository = new ProductRepositoryMock();
    creator = new ProductCreator(repository);
  });

  it('should create a new product', async () => {
    const product = ProductMother.random();
    repository.whenFindByIdReturn(null);
    await creator.run({
      id: product.id.value,
      name: product.name.value,
      description: product.description.value,
      categoryId: product.categoryId.value,
    });
    repository.assertLastSavedProductIs(product);
  });
});

