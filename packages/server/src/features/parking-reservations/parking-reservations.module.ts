import { Module } from '@nestjs/common';
import { ParkingReservationsService } from './services/parking-reservations.service';
import { ParkingReservationsController } from './controllers/parking-reservations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkingReservation, ParkingReservationSchema } from '../../schemas/parking-reservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ParkingReservation.name, schema: ParkingReservationSchema }])],
  controllers: [ParkingReservationsController],
  providers: [ParkingReservationsService]
})
export class ParkingReservationsModule {
}
