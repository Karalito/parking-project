import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class ParkingReservation {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;
  @Prop({ required: true })
  parkingPlaceId: string;
  @Prop({ required: true })
  date: Date;
}

export type ParkingReservationDocument = ParkingReservation & Document;
export const ParkingReservationSchema = SchemaFactory.createForClass(ParkingReservation);
