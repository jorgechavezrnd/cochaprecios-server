import { ProductPriceRepository } from '../../../../src/modules/prices/domain/productPriceRepository';
import { ProductPrice } from '../../../../src/modules/prices/domain/productPrice';
import { PriceId } from '../../../../src/modules/prices/domain/priceId';
import { ProductId } from '../../../../src/modules/products/domain/productId';
import { StoreId } from '../../../../src/modules/stores/domain/storeId';
import { Nullable } from '../../../../src/modules/shared/domain/nullable';

export class ProductPriceRepositoryMock implements ProductPriceRepository {
  private readonly mockSave = jest.fn();
  private readonly mockFindById = jest.fn();
  private readonly mockFindByProductId = jest.fn();
  private readonly mockFindByStoreId = jest.fn();
  private readonly mockSearch = jest.fn();

  async save(price: ProductPrice): Promise<void> { await this.mockSave(price); }
  async findById(id: PriceId): Promise<Nullable<ProductPrice>> { return await this.mockFindById(id); }
  async findByProductId(productId: ProductId): Promise<ProductPrice[]> { return await this.mockFindByProductId(productId); }
  async findByStoreId(storeId: StoreId): Promise<ProductPrice[]> { return await this.mockFindByStoreId(storeId); }
  async search(params: { productId?: ProductId; storeId?: StoreId; from?: Date; to?: Date }): Promise<ProductPrice[]> { return await this.mockSearch(params); }

  assertLastSavedPriceIs(expected: ProductPrice): void {
    const lastSaved = (this.mockSave.mock.calls[this.mockSave.mock.calls.length - 1] as ProductPrice[])[0];
    expect(lastSaved).toBeInstanceOf(ProductPrice);
    expect(lastSaved.id).toEqual(expected.id);
  }

  whenFindByIdReturn(price: Nullable<ProductPrice>): void { this.mockFindById.mockReturnValue(price); }
  whenSearchReturn(list: ProductPrice[]): void { this.mockSearch.mockReturnValue(list); }
}

