import { Module } from '@nestjs/common';
import { ParkingSpaceService } from './services/parking-space.service';
import { ParkingSpaceController } from './controllers/parking-space.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkingSpace, ParkingSpaceSchema } from '../../schemas/parking-space.schema';
import { ParkingReservation, ParkingReservationSchema } from '../../schemas/parking-reservation.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: ParkingSpace.name, schema: ParkingSpaceSchema },
    { name: ParkingReservation.name, schema: ParkingReservationSchema }
  ])],
  controllers: [ParkingSpaceController],
  providers: [ParkingSpaceService]
})
export class ParkingSpaceModule {
}
