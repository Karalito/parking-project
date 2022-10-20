import { Test, TestingModule } from '@nestjs/testing';
import { ParkingReservationSpaceService } from './parking-reservation-space.service';

describe('ParkingReservationSpaceService', () => {
  let service: ParkingReservationSpaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingReservationSpaceService],
    }).compile();

    service = module.get<ParkingReservationSpaceService>(ParkingReservationSpaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
