import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ParkingReservationSpace {
  @Prop({ required: true })
  parkingPlaceId: string;
}

export type ParkingReservationSpaceDocument = ParkingReservationSpace & Document;

export const ParkingReservationSpaceSchema = SchemaFactory.createForClass(ParkingReservationSpace);
