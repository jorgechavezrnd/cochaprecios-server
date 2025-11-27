import { getContainer, initializeContainer } from '../../../../../src/api/shared/dependency-injection/container';
import { CategoryRepository } from '../../../../../src/modules/categories/domain/categoryRepository';
import { EnvironmentArranger } from '../../../shared/infrastructure/arranger/environmentArranger';
import { CategoryMother } from '../../domain/categoryMother';
import { CategoryIdMother } from '../../../shared/domain/categoryIdMother';
import { CategoryNameMother } from '../../domain/categoryNameMother';

describe('TypeOrmCategoryRepository', () => {
  let repository: CategoryRepository;
  let environmentArranger: Promise<EnvironmentArranger>;

  beforeAll(async () => {
    await initializeContainer();
    const container = getContainer();
    repository = container.get('Categories.domain.CategoryRepository');
    environmentArranger = container.get('Shared.EnvironmentArranger');
  });

  beforeEach(async () => {
    await (await environmentArranger).arrangeTable('categories');
  });

  afterAll(async () => {
    await (await environmentArranger).arrangeTable('categories');
    await (await environmentArranger).close();
  });

  describe('#save', () => {
    it('should save a category', async () => {
      const category = CategoryMother.random();
      await repository.save(category);
      const saved = await repository.findById(category.id);
      expect(saved).toBeDefined();
      expect(saved?.id.value).toBe(category.id.value);
    });
  });

  describe('#findById', () => {
    it('should find a category by id', async () => {
      const category = CategoryMother.random();
      await repository.save(category);
      const found = await repository.findById(category.id);
      expect(found).toBeDefined();
      expect(found?.id.value).toBe(category.id.value);
    });
    it('should return null if not found', async () => {
      const id = CategoryIdMother.random();
      const found = await repository.findById(id);
      expect(found).toBeNull();
    });
  });

  describe('#findByName', () => {
    it('should find a category by name', async () => {
      const category = CategoryMother.random();
      await repository.save(category);
      const found = await repository.findByName(category.name);
      expect(found).toBeDefined();
      expect(found?.name.value).toBe(category.name.value);
    });
    it('should return null if not found', async () => {
      const name = CategoryNameMother.random();
      const found = await repository.findByName(name);
      expect(found).toBeNull();
    });
  });

  describe('#findAll', () => {
    it('should return all categories', async () => {
      const cat1 = CategoryMother.random();
      const cat2 = CategoryMother.random();
      await repository.save(cat1);
      await repository.save(cat2);
      const all = await repository.findAll();
      expect(all.length).toBeGreaterThanOrEqual(2);
      const ids = all.map(c => c.id.value);
      expect(ids).toContain(cat1.id.value);
      expect(ids).toContain(cat2.id.value);
    });
  });

  describe('#delete', () => {
    it('should delete a category by id', async () => {
      const category = CategoryMother.random();
      await repository.save(category);
      await repository.delete(category.id);
      const found = await repository.findById(category.id);
      expect(found).toBeNull();
    });
  });
});
