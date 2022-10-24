import { Test, TestingModule } from '@nestjs/testing';
import { ParkingReservationSpacesService } from './parking-reservation-spaces.service';

describe('ParkingReservationSpaceService', () => {
  let service: ParkingReservationSpacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingReservationSpacesService],
    }).compile();

    service = module.get<ParkingReservationSpacesService>(ParkingReservationSpacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
