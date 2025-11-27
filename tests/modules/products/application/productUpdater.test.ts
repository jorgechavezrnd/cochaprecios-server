import ProductUpdater from '../../../../src/modules/products/application/productUpdater';
import { ProductRepositoryMock } from '../__mocks__/productRepositoryMock';
import { ProductMother } from '../domain/productMother';
import { ProductNameMother } from '../domain/productNameMother';
import { ProductDescriptionMother } from '../domain/productDescriptionMother';
import { ProductCategoryIdMother } from '../domain/productCategoryIdMother';

describe('ProductUpdater', () => {
  let repository: ProductRepositoryMock;
  let updater: ProductUpdater;

  beforeEach(() => {
    repository = new ProductRepositoryMock();
    updater = new ProductUpdater(repository);
  });

  it('should update a valid product', async () => {
    const product = ProductMother.random();
    repository.whenFindByIdReturn(product);
    repository.whenFindByNameReturn(null);

    const newName = ProductNameMother.create('Updated Product Name');
    const newDescription = ProductDescriptionMother.create('Updated Description');
    const newCategoryId = ProductCategoryIdMother.random();

    await updater.run({
      id: product.id.value,
      name: newName.value,
      description: newDescription.value,
      categoryId: newCategoryId.value,
    });

    const expected = ProductMother.create(
      product.id,
      newName,
      newDescription,
      newCategoryId,
    );
    repository.assertLastSavedProductIs(expected);
  });

  it('should throw if product does not exist', async () => {
    repository.whenFindByIdReturn(null);
    const nonexistent = ProductCategoryIdMother.random();
    await expect(
      updater.run({
        id: '3FA85F64-5717-4562-B3FC-2C963F66AFA6',
        name: ProductNameMother.random().value,
        description: ProductDescriptionMother.random().value,
        categoryId: nonexistent.value,
      })
    ).rejects.toThrow('Product with id 3FA85F64-5717-4562-B3FC-2C963F66AFA6 does not exist');
  });

  it('should throw if name already exists for another product', async () => {
    const p1 = ProductMother.random();
    const p2 = ProductMother.random();
    repository.whenFindByIdReturn(p1);
    repository.whenFindByNameReturn(p2);

    await expect(
      updater.run({
        id: p1.id.value,
        name: p2.name.value,
        description: p1.description.value,
        categoryId: p1.categoryId.value,
      })
    ).rejects.toThrow(`Product with name ${p2.name.value} already exists`);
  });
});

