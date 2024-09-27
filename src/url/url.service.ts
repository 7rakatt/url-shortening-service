import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './schemas/url.schema';
import mongoose, { Query } from 'mongoose';
import { creatUrlDto } from './Dto/createUrl-Dto';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name)
    private urlModel: mongoose.Model<Url>,
  ) {}

  async getShorten(shortCode: string): Promise<Url> {
    if (shortCode.length > 6) {
      throw new BadRequestException('not valid short url');
    }
    const url = await this.urlModel.findOneAndUpdate(
      { shortCode: shortCode },
      { $inc: { accessCount: 1 }},
      { new: true },
    );

    if (!url) {
      throw new NotFoundException('url is not found');
    }

    return url;
  }

  async findAll(): Promise<Url[]> {
    const urls = await this.urlModel.find();
    return urls;
  }

  async create(url: Url): Promise<Url> {
    const res = await this.urlModel.create(url);
    return res;
  }

  async update(shortCode:string, url: creatUrlDto): Promise<Url> {
    const updatedUrl = await this.urlModel.findOneAndUpdate(
      {shortCode:shortCode},
      url,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!url) {
      throw new NotFoundException('url is not found');
    }
    return updatedUrl;
  }

  async delete(shortenCode: string) {
    const res = await this.urlModel.findOneAndDelete({
      shortCode: shortenCode,
    });
  }
}
