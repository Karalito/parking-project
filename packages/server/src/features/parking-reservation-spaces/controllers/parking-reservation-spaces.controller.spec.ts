import { Test, TestingModule } from '@nestjs/testing';
import { ParkingReservationSpacesController } from './parking-reservation-spaces.controller';
import { ParkingReservationSpacesService } from '../services/parking-reservation-spaces.service';

describe('ParkingReservationSpaceController', () => {
  let controller: ParkingReservationSpacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingReservationSpacesController],
      providers: [ParkingReservationSpacesService],
    }).compile();

    controller = module.get<ParkingReservationSpacesController>(ParkingReservationSpacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
