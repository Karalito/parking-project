import { Module } from '@nestjs/common';
import { ParkingSpaceService } from './services/parking-space.service';
import { ParkingSpaceController } from './controllers/parking-space.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkingSpace, ParkingSpaceSchema } from '../../schemas/parking-space.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ParkingSpace.name, schema: ParkingSpaceSchema }])],
  controllers: [ParkingSpaceController],
  providers: [ParkingSpaceService]
})
export class ParkingSpaceModule {
}
