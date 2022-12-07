import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { RoomReservationSpace } from './room-reservation-space.schema';

@Schema({ timestamps: true })
export class Table {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: RoomReservationSpace.name })
  roomId: string;
  @Prop({ required: true })
  tableNumber: number;
  @Prop({ required: true })
  isErgonomic: boolean;
}

export type TableDocument = Table & Document;
export const TableSchema = SchemaFactory.createForClass(Table);
