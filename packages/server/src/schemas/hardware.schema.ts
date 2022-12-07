import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Hardware {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  size: string;
  @Prop({ required: true })
  quantity: number;
}

export type HardwareDocument = Hardware & Document;
export const HardwareSchema = SchemaFactory.createForClass(Hardware);
