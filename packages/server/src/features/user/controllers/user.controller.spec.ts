import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userStub } from '../../../shared/stubs/user.stub';
import { User } from '../../../schemas/user.schema';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../services/user.service';

describe('UsersController', () => {
  let controller: UserController;
  let service: UserService;
  const userId = '630774f25494e5c1a8533fc6';
  const params = { id: userId };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    })
      // .overrideGuard(IsCreatorGuard)
      // .useValue(true)
      // .overrideGuard(RolesGuard)
      // .useValue(true)
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await controller.findAll();
      });

      it('then it should call service', () => {
        expect(service.findAll).toHaveBeenCalled();
      });

      it('then it should return all user', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await controller.findOne(params);
      });

      it('then it should call service', () => {
        expect(service.findOne).toBeCalledWith(userId);
      });

      it('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let user: User;
      let updateUserDto: UpdateUserDto;

      beforeEach(async () => {
        updateUserDto = {
          fullName: userStub().fullName
        };

        user = await controller.update(params, updateUserDto);
      });

      it('then it should call service', () => {
        expect(service.update).toHaveBeenCalledWith(userId, updateUserDto);
      });

      it('then it should return a updated user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await controller.remove(params);
      });

      it('then it should call service', () => {
        expect(service.remove).toHaveBeenCalledWith(userId);
      });

      it('then it should return deleted user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
