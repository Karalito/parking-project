import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSpaceController } from './parking-space.controller';
import { ParkingSpaceService } from '../services/parking-space.service';

describe('ParkingReservationSpaceController', () => {
  let controller: ParkingSpaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingSpaceController],
      providers: [ParkingSpaceService],
    }).compile();

    controller = module.get<ParkingSpaceController>(ParkingSpaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
