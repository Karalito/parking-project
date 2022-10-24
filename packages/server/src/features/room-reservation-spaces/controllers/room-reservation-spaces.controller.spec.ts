import { Test, TestingModule } from '@nestjs/testing';
import { RoomReservationSpacesController } from './room-reservation-spaces.controller';
import { RoomReservationSpacesService } from '../services/room-reservation-spaces.service';

describe('RoomReservationSpaceController', () => {
  let controller: RoomReservationSpacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomReservationSpacesController],
      providers: [RoomReservationSpacesService],
    }).compile();

    controller = module.get<RoomReservationSpacesController>(RoomReservationSpacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
