import { Test, TestingModule } from '@nestjs/testing';
import { ParkingReservationsService } from './parking-reservations.service';

describe('ParkingReservationsService', () => {
  let service: ParkingReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingReservationsService],
    }).compile();

    service = module.get<ParkingReservationsService>(ParkingReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
