import { Module } from '@nestjs/common';
import { RoomReservationsService } from './services/room-reservations.service';
import { RoomReservationsController } from './controllers/room-reservations.controller';
import { RoomReservation, RoomReservationSchema } from '../../schemas/room-reservation.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: RoomReservation.name, schema: RoomReservationSchema }])],
  controllers: [RoomReservationsController],
  providers: [RoomReservationsService]
})
export class RoomReservationsModule {
}
