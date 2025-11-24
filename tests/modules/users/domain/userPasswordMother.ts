import { UserPassword } from '../../../../src/modules/users/domain/userPassword';
import { WordMother } from '../../shared/domain/wordMother';

export class UserPasswordMother {
  static create(value: string): UserPassword {
    return new UserPassword(value);
  }

  static random(): UserPassword {
    return this.create(WordMother.random() + '123456');
  }

  static invalidPassword(): string {
    return '12345'; // Too short
  }
}
