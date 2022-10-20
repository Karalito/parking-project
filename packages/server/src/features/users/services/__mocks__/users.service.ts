import { userStub } from '../../../../shared/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([userStub()]),
  findOne: jest.fn().mockResolvedValue(userStub()),
  update: jest.fn().mockResolvedValue(userStub()),
  remove: jest.fn().mockResolvedValue(userStub())
})
