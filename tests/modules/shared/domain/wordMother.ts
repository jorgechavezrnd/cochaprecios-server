import { MotherCreator } from './motherCreator';

export class WordMother {
  static random(): string {
    return MotherCreator.random().lorem.word();
  }
}
