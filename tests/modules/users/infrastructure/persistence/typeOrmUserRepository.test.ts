import { getContainer, initializeContainer } from '../../../../../src/api/shared/dependency-injection/container';
import { UserRepository } from '../../../../../src/modules/users/domain/userRepository';
import { EnvironmentArranger } from '../../../shared/infrastructure/arranger/environmentArranger';
import { UserMother } from '../../domain/userMother';

let repository: UserRepository;
let environmentArranger: Promise<EnvironmentArranger>;

beforeAll(async () => {
  await initializeContainer();

  const container = getContainer();
  repository = container.get('Users.domain.UserRepository');
  environmentArranger = container.get('Shared.EnvironmentArranger');
});

beforeEach(async() => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});

describe('TypeOrmUserRepository', () => {
  describe('#save', () => {
    it('should save a user', async () => {
      const user = UserMother.random();

      await repository.save(user);
    });
  });
});
