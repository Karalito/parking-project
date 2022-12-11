import { Test, TestingModule } from '@nestjs/testing';
import { RoomSpaceController } from './room-space.controller';
import { RoomSpaceService } from '../services/room-space.service';

describe('RoomReservationSpaceController', () => {
  let controller: RoomSpaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomSpaceController],
      providers: [RoomSpaceService],
    }).compile();

    controller = module.get<RoomSpaceController>(RoomSpaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
