import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event {
  @Prop({ required: true, unique: true, type: String })
  title: string;

  @Prop({ type: [Number], default: [] })
  subscribers_id?: number[];
}

export type EventDocument = Event & Document;
export const EventSchema = SchemaFactory.createForClass(Event);
