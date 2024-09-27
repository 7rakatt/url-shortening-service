import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { urlSchema } from './schemas/url.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Url', schema: urlSchema }])],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
