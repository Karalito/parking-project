import { userStub } from '../../../../shared/stubs/user.stub';

export const UserSecurityService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userStub()),
  findOneByProviderId: jest.fn().mockResolvedValue(userStub())
});
