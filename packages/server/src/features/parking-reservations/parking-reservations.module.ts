import { Module } from '@nestjs/common';
import { ParkingReservationsService } from './services/parking-reservations.service';
import { ParkingReservationsController } from './controllers/parking-reservations.controller';

@Module({
  controllers: [ParkingReservationsController],
  providers: [ParkingReservationsService]
})
export class ParkingReservationsModule {}
