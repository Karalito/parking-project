import { Module } from '@nestjs/common';
import { RoomReservationService } from './services/room-reservation.service';
import { RoomReservationController } from './controllers/room-reservation.controller';
import { RoomReservation, RoomReservationSchema } from '../../schemas/room-reservation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSpace, RoomSpaceSchema } from '../../schemas/room-space.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: RoomReservation.name, schema: RoomReservationSchema },
    { name: RoomSpace.name, schema: RoomSpaceSchema }
  ])],
  controllers: [RoomReservationController],
  providers: [RoomReservationService]
})
export class RoomReservationModule {
}
