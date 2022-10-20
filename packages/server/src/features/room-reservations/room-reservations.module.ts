import { Module } from '@nestjs/common';
import { RoomReservationsService } from './services/room-reservations.service';
import { RoomReservationsController } from './controllers/room-reservations.controller';

@Module({
  controllers: [RoomReservationsController],
  providers: [RoomReservationsService]
})
export class RoomReservationsModule {}
