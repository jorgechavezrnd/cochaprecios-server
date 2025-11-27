import { ProductRepository } from '../../../../src/modules/products/domain/productRepository';
import { Product } from '../../../../src/modules/products/domain/product';
import { ProductId } from '../../../../src/modules/products/domain/productId';
import { ProductName } from '../../../../src/modules/products/domain/productName';
import { CategoryId } from '../../../../src/modules/shared/domain/categories/categoryId';
import { Nullable } from '../../../../src/modules/shared/domain/nullable';

export class ProductRepositoryMock implements ProductRepository {
  private readonly mockSave = jest.fn();
  private readonly mockFindById = jest.fn();
  private readonly mockFindByName = jest.fn();
  private readonly mockFindByCategoryId = jest.fn();
  private readonly mockFindAll = jest.fn();

  async save(product: Product): Promise<void> { await this.mockSave(product); }
  async findById(id: ProductId): Promise<Nullable<Product>> { return await this.mockFindById(id); }
  async findByName(name: ProductName): Promise<Nullable<Product>> { return await this.mockFindByName(name); }
  async findByCategoryId(categoryId: CategoryId): Promise<Product[]> { return await this.mockFindByCategoryId(categoryId); }
  async findAll(): Promise<Product[]> { return await this.mockFindAll(); }

  assertLastSavedProductIs(expected: Product): void {
    const lastSaved = (this.mockSave.mock.calls[this.mockSave.mock.calls.length - 1] as Product[])[0];
    expect(lastSaved).toBeInstanceOf(Product);
    expect(lastSaved.id).toEqual(expected.id);
  }

  whenFindByIdReturn(product: Nullable<Product>): void { this.mockFindById.mockReturnValue(product); }
  whenFindByNameReturn(product: Nullable<Product>): void { this.mockFindByName.mockReturnValue(product); }
  whenFindByCategoryIdReturn(list: Product[]): void { this.mockFindByCategoryId.mockReturnValue(list); }
  whenFindAllReturn(list: Product[]): void { this.mockFindAll.mockReturnValue(list); }
}

