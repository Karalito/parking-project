import { Module } from '@nestjs/common';
import { RoomSpaceService } from './services/room-space.service';
import { RoomSpaceController } from './controllers/room-space.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSpace, RoomSpaceSchema } from '../../schemas/room-space.schema';
import { RoomReservation, RoomReservationSchema } from '../../schemas/room-reservation.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: RoomSpace.name, schema: RoomSpaceSchema },
    { name: RoomReservation.name, schema: RoomReservationSchema }])],
  controllers: [RoomSpaceController],
  providers: [RoomSpaceService]
})
export class RoomSpaceModule {
}
