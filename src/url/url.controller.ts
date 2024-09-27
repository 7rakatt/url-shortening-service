import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req } from '@nestjs/common';
import { UrlService } from './url.service';
import { Url } from './schemas/url.schema';
import { creatUrlDto } from './Dto/createUrl-Dto';

@Controller('shorten')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Get()
  async findAll(): Promise<Url[]> {
    return this.urlService.findAll();
  }

  @Get(':shortenCode')
  async getShorten(@Param('shortenCode') shortCode: string): Promise<Url> {
    return this.urlService.getShorten(shortCode);
  }

  @Post()
  async createShortUrl(@Body() url: creatUrlDto): Promise<Url> {
    return this.urlService.create(url);
  }

  @Delete(':shortenCode')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('shortenCode') shortenCode: string) {
    return this.urlService.delete(shortenCode);
  }



  @Patch(':shortenCode')
  async update(@Param('shortenCode') shortenCode:string,@Body() url:creatUrlDto) {
    return this.urlService.update(shortenCode,url);
  }

}
