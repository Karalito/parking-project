import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ParkingSpace {
  @Prop({ required: true })
  parkingPlaceNumber: number;
}

export type ParkingSpaceDocument = ParkingSpace & Document;

export const ParkingSpaceSchema = SchemaFactory.createForClass(ParkingSpace);
