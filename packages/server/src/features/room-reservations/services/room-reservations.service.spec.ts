import { Test, TestingModule } from '@nestjs/testing';
import { RoomReservationsService } from './room-reservations.service';

describe('RoomReservationsService', () => {
  let service: RoomReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomReservationsService],
    }).compile();

    service = module.get<RoomReservationsService>(RoomReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
