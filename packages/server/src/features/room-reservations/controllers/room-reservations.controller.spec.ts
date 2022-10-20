import { Test, TestingModule } from '@nestjs/testing';
import { RoomReservationsController } from './room-reservations.controller';
import { RoomReservationsService } from '../services/room-reservations.service';

describe('RoomReservationsController', () => {
  let controller: RoomReservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomReservationsController],
      providers: [RoomReservationsService],
    }).compile();

    controller = module.get<RoomReservationsController>(RoomReservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
