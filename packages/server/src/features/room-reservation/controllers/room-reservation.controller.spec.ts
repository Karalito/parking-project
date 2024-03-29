import { Test, TestingModule } from '@nestjs/testing';
import { RoomReservationController } from './room-reservation.controller';
import { RoomReservationService } from '../services/room-reservation.service';

describe('RoomReservationsController', () => {
  let controller: RoomReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomReservationController],
      providers: [RoomReservationService],
    }).compile();

    controller = module.get<RoomReservationController>(RoomReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
