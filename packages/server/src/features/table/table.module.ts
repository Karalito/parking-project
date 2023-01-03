import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TableSchema } from '../../schemas/table.schema';
import { TableService } from './services/table.service';
import { TableController } from './controllers/table.controller';
import { RoomSpace, RoomSpaceSchema } from '../../schemas/room-space.schema';
import { RoomReservation, RoomReservationSchema } from '../../schemas/room-reservation.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Table.name, schema: TableSchema },
    { name: RoomSpace.name, schema: RoomSpaceSchema },
    { name: RoomReservation.name, schema: RoomReservationSchema }])],
  providers: [TableService],
  controllers: [TableController]
})
export class TableModule {
}
