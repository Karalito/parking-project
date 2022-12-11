import { Module } from '@nestjs/common';
import { ParkingReservationsService } from './services/parking-reservations.service';
import { ParkingReservationController } from './controllers/parking-reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkingReservation, ParkingReservationSchema } from '../../schemas/parking-reservation.schema';
import { ParkingSpace, ParkingSpaceSchema } from '../../schemas/parking-space.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ParkingReservation.name, schema: ParkingReservationSchema },
      { name: ParkingSpace.name, schema: ParkingSpaceSchema }
    ])],
  controllers: [ParkingReservationController],
  providers: [ParkingReservationsService]
})
export class ParkingReservationModule {
}
