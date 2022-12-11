import { Module } from '@nestjs/common';
import { RoomSpaceService } from './services/room-space.service';
import { RoomSpaceController } from './controllers/room-space.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSpace, RoomSpaceSchema } from '../../schemas/room-space.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: RoomSpace.name, schema: RoomSpaceSchema }])],
  controllers: [RoomSpaceController],
  providers: [RoomSpaceService]
})
export class RoomSpaceModule {
}
