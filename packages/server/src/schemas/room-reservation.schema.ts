import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class RoomReservation {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  tableId: string;

  @Prop({ required: true })
  date: Date;
}

export type RoomReservationDocument = RoomReservation & Document;

export const RoomReservationSchema = SchemaFactory.createForClass(RoomReservation);
