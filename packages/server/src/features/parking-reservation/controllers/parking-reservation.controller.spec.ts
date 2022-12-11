import { Test, TestingModule } from '@nestjs/testing';
import { ParkingReservationController } from './parking-reservation.controller';
import { ParkingReservationsService } from '../services/parking-reservations.service';

describe('ParkingReservationsController', () => {
  let controller: ParkingReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingReservationController],
      providers: [ParkingReservationsService],
    }).compile();

    controller = module.get<ParkingReservationController>(ParkingReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
