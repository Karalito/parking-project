import { Test, TestingModule } from '@nestjs/testing';
import { RoomReservationSpaceService } from './room-reservation-space.service';

describe('RoomReservationSpaceService', () => {
  let service: RoomReservationSpaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomReservationSpaceService],
    }).compile();

    service = module.get<RoomReservationSpaceService>(RoomReservationSpaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
