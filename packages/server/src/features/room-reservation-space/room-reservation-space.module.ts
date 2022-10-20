import { Module } from '@nestjs/common';
import { RoomReservationSpaceService } from './services/room-reservation-space.service';
import { RoomReservationSpaceController } from './controllers/room-reservation-space.controller';

@Module({
  controllers: [RoomReservationSpaceController],
  providers: [RoomReservationSpaceService]
})
export class RoomReservationSpaceModule {}
