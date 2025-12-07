import { AggregateRoot } from '../../shared/domain/aggregateRoot';
import { StoreId } from './storeId';
import { StoreName } from './storeName';
import { StoreAddress } from './storeAddress';
import { StorePhone } from './storePhone';
import { StoreCreatedAt } from './storeCreatedAt';
import { StoreUpdatedAt } from './storeUpdatedAt';

export class Store extends AggregateRoot {
  readonly id: StoreId;
  name: StoreName;
  address: StoreAddress;
  phone: StorePhone;
  readonly createdAt?: StoreCreatedAt;
  updatedAt?: StoreUpdatedAt;

  constructor(
    id: StoreId,
    name: StoreName,
    address: StoreAddress,
    phone: StorePhone,
    createdAt?: StoreCreatedAt,
    updatedAt?: StoreUpdatedAt
  ) {
    super();
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromPrimitives(plain: { id: string; name: string; address: string; phone: string; createdAt?: Date; updatedAt?: Date }): Store {
    return new Store(
      new StoreId(plain.id),
      new StoreName(plain.name),
      new StoreAddress(plain.address),
      new StorePhone(plain.phone),
      plain.createdAt ? new StoreCreatedAt(plain.createdAt) : undefined,
      plain.updatedAt ? new StoreUpdatedAt(plain.updatedAt) : undefined
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      address: this.address.value,
      phone: this.phone.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
    };
  }
}
