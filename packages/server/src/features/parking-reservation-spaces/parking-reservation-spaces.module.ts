import { Module } from '@nestjs/common';
import { ParkingReservationSpacesService } from './services/parking-reservation-spaces.service';
import { ParkingReservationSpacesController } from './controllers/parking-reservation-spaces.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkingReservationSpace, ParkingReservationSpaceSchema } from '../../schemas/parking-reservation-space.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ParkingReservationSpace.name, schema: ParkingReservationSpaceSchema }])],
  controllers: [ParkingReservationSpacesController],
  providers: [ParkingReservationSpacesService]
})
export class ParkingReservationSpacesModule {
}
