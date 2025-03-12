import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status } from '../enums/status';

@Schema({timestamps: true})
export class User {
  @Prop({ required: true, unique: true, type: Number })
  id: number;

  @Prop({ type: String })
  first_name?: string;

  @Prop({ type: String })
  last_name?: string;

  @Prop({ type: String })
  username?: string;

  @Prop({ type: String })
  language_code?: string;

  @Prop({ type: String, enum: ['teacher', 'user'] })
  status?: Status;

  @Prop({ type: Number })
  topic_id?: number;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
