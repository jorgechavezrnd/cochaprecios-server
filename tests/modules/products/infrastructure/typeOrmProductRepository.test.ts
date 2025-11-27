import { getContainer, initializeContainer } from '../../../../src/api/shared/dependency-injection/container';
import { ProductRepository } from '../../../../src/modules/products/domain/productRepository';
import { EnvironmentArranger } from '../../shared/infrastructure/arranger/environmentArranger';
import { ProductMother } from '../domain/productMother';

describe('TypeOrmProductRepository', () => {
  let repository: ProductRepository;
  let environmentArranger: Promise<EnvironmentArranger>;

  beforeAll(async () => {
    await initializeContainer();
    const container = getContainer();
    repository = container.get('Products.domain.ProductRepository');
    environmentArranger = container.get('Shared.EnvironmentArranger');
  });

  beforeEach(async () => {
    await (await environmentArranger).arrangeTable('products');
  });

  afterAll(async () => {
    await (await environmentArranger).arrangeTable('products');
    await (await environmentArranger).close();
  });

  it('should save and find by id', async () => {
    const product = ProductMother.random();
    await repository.save(product);
    const found = await repository.findById(product.id);
    expect(found).toBeDefined();
    expect(found?.id.value).toBe(product.id.value);
  });

  it('should find by name', async () => {
    const product = ProductMother.random();
    await repository.save(product);
    const found = await repository.findByName(product.name);
    expect(found).toBeDefined();
    expect(found?.name.value).toBe(product.name.value);
  });

  it('should find by categoryId', async () => {
    const product = ProductMother.random();
    await repository.save(product);
    const list = await repository.findByCategoryId(product.categoryId);
    expect(list.length).toBeGreaterThanOrEqual(1);
    const ids = list.map(p => p.id.value);
    expect(ids).toContain(product.id.value);
  });
});
