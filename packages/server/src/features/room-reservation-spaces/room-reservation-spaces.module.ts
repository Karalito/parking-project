import { Module } from '@nestjs/common';
import { RoomReservationSpacesService } from './services/room-reservation-spaces.service';
import { RoomReservationSpacesController } from './controllers/room-reservation-spaces.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomReservationSpace, RoomReservationSpaceSchema } from '../../schemas/room-reservation-space.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: RoomReservationSpace.name, schema: RoomReservationSpaceSchema }])],
  controllers: [RoomReservationSpacesController],
  providers: [RoomReservationSpacesService]
})
export class RoomReservationSpacesModule {
}
