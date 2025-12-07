import { LikeId } from '../../../../src/modules/likes/domain/likeId';
import { UuidMother } from '../../shared/domain/uuidMother';

export class LikeIdMother {
  static create(value: string): LikeId {
    return new LikeId(value);
  }

  static random(): LikeId {
    return this.create(UuidMother.random());
  }
}
