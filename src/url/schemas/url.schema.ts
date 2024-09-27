import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { generateRandomString } from 'src/utils/generatRandomStr';



@Schema({
  timestamps: true, //createdAt + updatedAt
})
export class Url {
  @Prop()
  @IsString()
  url: string;

  @Prop({ type: String, default: () => generateRandomString() })
  shortCode?: string;

  @Prop({ type: Number, default: 0 })
  accessCount?: number;
}

export const urlSchema = SchemaFactory.createForClass(Url);
