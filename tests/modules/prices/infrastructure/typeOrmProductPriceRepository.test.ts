import { getContainer, initializeContainer } from '../../../../src/api/shared/dependency-injection/container';
import { ProductPriceRepository } from '../../../../src/modules/prices/domain/productPriceRepository';
import { EnvironmentArranger } from '../../shared/infrastructure/arranger/environmentArranger';
import { ProductPriceMother } from '../domain/productPriceMother';

describe('TypeOrmProductPriceRepository', () => {
  let repository: ProductPriceRepository;
  let environmentArranger: Promise<EnvironmentArranger>;

  beforeAll(async () => {
    await initializeContainer();
    const container = getContainer();
    repository = container.get('Prices.domain.ProductPriceRepository');
    environmentArranger = container.get('Shared.EnvironmentArranger');
  });

  beforeEach(async () => {
    await (await environmentArranger).arrangeTable('prices');
  });

  afterAll(async () => {
    await (await environmentArranger).arrangeTable('prices');
    await (await environmentArranger).close();
  });

  it('should save and find by id', async () => {
    const price = ProductPriceMother.random();
    await repository.save(price);
    const found = await repository.findById(price.id);
    expect(found).toBeDefined();
    expect(found?.id.value).toBe(price.id.value);
  });

  it('should search by product and date range', async () => {
    const price = ProductPriceMother.random();
    await repository.save(price);
    const list = await repository.search({ productId: price.productId, from: new Date('2024-07-01'), to: new Date('2024-09-01') });
    expect(list.length).toBeGreaterThanOrEqual(1);
  });
});

