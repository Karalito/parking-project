import { Test, TestingModule } from '@nestjs/testing';
import { RoomReservationSpaceController } from './room-reservation-space.controller';
import { RoomReservationSpaceService } from '../services/room-reservation-space.service';

describe('RoomReservationSpaceController', () => {
  let controller: RoomReservationSpaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomReservationSpaceController],
      providers: [RoomReservationSpaceService],
    }).compile();

    controller = module.get<RoomReservationSpaceController>(RoomReservationSpaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
