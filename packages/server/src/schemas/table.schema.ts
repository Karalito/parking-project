import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Table {
  @Prop({ required: true })
  tableNumber: number;
  @Prop({ required: true })
  isErgonomic: boolean;
}

export type TableDocument = Table & Document;
export const TableSchema = SchemaFactory.createForClass(Table);
