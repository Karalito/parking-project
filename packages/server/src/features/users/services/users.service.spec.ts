import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { mongooseModelStub } from '../../../shared/stubs/mongoose.stub';
import { getModelToken } from '@nestjs/mongoose';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: getModelToken('User'), useValue: mongooseModelStub }]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should call findAll method', async () => {
    await service.findAll();
    expect(mongooseModelStub.find).toHaveBeenCalled();
    expect(mongooseModelStub.exec).toHaveBeenCalled();
  });

  it('should call findOne method with provider param', async () => {
    await service.findOne(null);
    expect(mongooseModelStub.findById).toHaveBeenCalled();
    expect(mongooseModelStub.exec).toHaveBeenCalled();
  });

  it('should call update method with expected params', async () => {
    await service.update(null, null);
    expect(mongooseModelStub.findOneAndUpdate).toHaveBeenCalled();
  });

  it('should call remove method with expected param', async () => {
    await service.remove(null);
    expect(mongooseModelStub.findByIdAndRemove).toHaveBeenCalled();
  });
});
