import { Test, TestingModule } from '@nestjs/testing';
import { RoomSpaceService } from './room-space.service';

describe('RoomReservationSpaceService', () => {
  let service: RoomSpaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomSpaceService],
    }).compile();

    service = module.get<RoomSpaceService>(RoomSpaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
