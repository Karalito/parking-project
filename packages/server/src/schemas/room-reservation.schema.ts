import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';
import { RoomSpace } from './room-space.schema';
import { Hardware } from './hardware.schema';

@Schema({ timestamps: true })
export class RoomReservation {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: RoomSpace.name })
  roomId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Hardware.name })
  hardwareId: string;
  @Prop({ required: true })
  date: Date;
}

export type RoomReservationDocument = RoomReservation & Document;

export const RoomReservationSchema = SchemaFactory.createForClass(RoomReservation);
