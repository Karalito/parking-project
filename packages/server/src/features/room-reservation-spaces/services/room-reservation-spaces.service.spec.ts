import { Test, TestingModule } from '@nestjs/testing';
import { RoomReservationSpacesService } from './room-reservation-spaces.service';

describe('RoomReservationSpaceService', () => {
  let service: RoomReservationSpacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomReservationSpacesService],
    }).compile();

    service = module.get<RoomReservationSpacesService>(RoomReservationSpacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
