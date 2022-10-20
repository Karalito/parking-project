import { Test, TestingModule } from '@nestjs/testing';
import { ParkingReservationsController } from './parking-reservations.controller';
import { ParkingReservationsService } from '../services/parking-reservations.service';

describe('ParkingReservationsController', () => {
  let controller: ParkingReservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingReservationsController],
      providers: [ParkingReservationsService],
    }).compile();

    controller = module.get<ParkingReservationsController>(ParkingReservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
