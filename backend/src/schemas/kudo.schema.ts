import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KudoDocument = Kudo & Document;

@Schema()
export class Kudo {
  @Prop()
  name: string;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop()
  tokenId: string;
}

export const KudoSchema = SchemaFactory.createForClass(Kudo);
