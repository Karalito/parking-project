import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class RoomReservationSpace {
  @Prop({ required: true })
  tableId: string;

  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  screenSize: string;
}

export type RoomReservationSpaceDocument = RoomReservationSpace & Document;

export const RoomReservationSpaceSchema = SchemaFactory.createForClass(RoomReservationSpace);
