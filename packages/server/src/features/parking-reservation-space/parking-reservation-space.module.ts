import { Module } from '@nestjs/common';
import { ParkingReservationSpaceService } from './services/parking-reservation-space.service';
import { ParkingReservationSpaceController } from './controllers/parking-reservation-space.controller';

@Module({
  controllers: [ParkingReservationSpaceController],
  providers: [ParkingReservationSpaceService]
})
export class ParkingReservationSpaceModule {}
