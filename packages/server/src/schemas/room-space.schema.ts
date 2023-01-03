import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Table } from './table.schema';

@Schema({ timestamps: true })
export class RoomSpace {
  @Prop({ required: true })
  roomNumber: number;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Table.name })
  tableId: string;
  _id?: any;
}

export type RoomSpaceDocument = RoomSpace & Document;

export const RoomSpaceSchema = SchemaFactory.createForClass(RoomSpace);
