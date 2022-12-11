import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../schemas/user.schema';
import { ParkingSpaceSchema } from '../../schemas/parking-space.schema';
import { RoomSpaceSchema } from '../../schemas/room-space.schema';
import { RoomReservationSchema } from '../../schemas/room-reservation.schema';
import { ParkingReservationSchema } from '../../schemas/parking-reservation.schema';
import { PopulateDbController } from './controllers/populate-db.controller';
import { PopulateDbService } from './services/populate-db.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ParkingReservationSpace', schema: ParkingSpaceSchema },
      { name: 'RoomReservationSpace', schema: RoomSpaceSchema },
      { name: 'RoomReservation', schema: RoomReservationSchema },
      { name: 'ParkingReservation', schema: ParkingReservationSchema },
      { name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [PopulateDbController],
  providers: [PopulateDbService]
})
export class PopulateDbModule {
}
