import { EntitySchema, Between } from 'typeorm';
import { Nullable } from '../../../shared/domain/nullable';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm/typeOrmRepository';
import { ProductPrice } from '../../../prices/domain/productPrice';
import { ProductPriceRepository } from '../../../prices/domain/productPriceRepository';
import { PriceId } from '../../../prices/domain/priceId';
import { ProductId } from '../../../products/domain/productId';
import { StoreId } from '../../../stores/domain/storeId';
import { ProductPriceEntity } from './typeorm/productPriceEntity';

export default class TypeOrmProductPriceRepository extends TypeOrmRepository<ProductPrice> implements ProductPriceRepository {
  public async save(price: ProductPrice): Promise<void> {
    return this.persist(price);
  }

  public async findById(id: PriceId): Promise<Nullable<ProductPrice>> {
    const repository = await this.repository();
    return repository.findOne({ where: { id } });
  }

  public async findByProductId(productId: ProductId): Promise<ProductPrice[]> {
    const repository = await this.repository();
    return repository.find({ where: { productId } });
  }

  public async findByStoreId(storeId: StoreId): Promise<ProductPrice[]> {
    const repository = await this.repository();
    return repository.find({ where: { storeId } });
  }

  public async search(params: { productId?: ProductId; storeId?: StoreId; from?: Date; to?: Date }): Promise<ProductPrice[]> {
    const repository = await this.repository();
    const qb = repository.createQueryBuilder('price');
    qb.where('1=1');
    if (params.productId) qb.andWhere('price.product_id = :pid', { pid: params.productId.value });
    if (params.storeId) qb.andWhere('price.store_id = :sid', { sid: params.storeId.value });
    if (params.from && params.to) qb.andWhere('price.collected_at BETWEEN :from AND :to', { from: params.from, to: params.to });
    else if (params.from) qb.andWhere('price.collected_at >= :from', { from: params.from });
    else if (params.to) qb.andWhere('price.collected_at <= :to', { to: params.to });
    qb.orderBy('price.collected_at', 'DESC');
    return qb.getMany();
  }

  protected entitySchema(): EntitySchema<ProductPrice> {
    return ProductPriceEntity;
  }
}
