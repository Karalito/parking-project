import { Test, TestingModule } from '@nestjs/testing';
import { ParkingReservationSpaceController } from './parking-reservation-space.controller';
import { ParkingReservationSpaceService } from '../services/parking-reservation-space.service';

describe('ParkingReservationSpaceController', () => {
  let controller: ParkingReservationSpaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingReservationSpaceController],
      providers: [ParkingReservationSpaceService],
    }).compile();

    controller = module.get<ParkingReservationSpaceController>(ParkingReservationSpaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
