import { AggregateRoot } from '../../shared/domain/aggregateRoot';
import { StoreId } from './storeId';
import { StoreName } from './storeName';
import { StoreAddress } from './storeAddress';
import { StorePhone } from './storePhone';

export class Store extends AggregateRoot {
  readonly id: StoreId;
  name: StoreName;
  address: StoreAddress;
  phone: StorePhone;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: StoreId,
    name: StoreName,
    address: StoreAddress,
    phone: StorePhone,
    createdAt?: Date,
    updatedAt?: Date
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
      plain.createdAt,
      plain.updatedAt
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      address: this.address.value,
      phone: this.phone.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
